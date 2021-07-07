import { ScheduleRow, ScheduleRowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
import { Composition, SubstitutionComposition } from "../../../model/composition";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { Injectable } from "@angular/core";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";

@Injectable()
export class TableRowRemover {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private tableRenderer: TableRenderer,
              private intervalCreator: IntervalCreator) {}

  removeRow(groupData: ScheduleRowGroup,
            row: ScheduleRow,
            composition: Composition,
            dtos: EmployeeScheduleDTO[]) {
    const table = groupData.table;

    const dto = binarySearch(dtos, (mid => mid.parent.id - composition.employeeId));

    if (row.isSubstitution) {
      // Remove composition from initial data
      removeFromArray(dto.substitutionCompositions, value => value.id === composition.id);

      // Update related compositions
      this.updateRelatedMainCompositions(dto.mainCompositions, dto.substitutionCompositions, table);
    } else {
      // Remove composition from initial data
      removeFromArray(dto.mainCompositions, value => value.id === composition.id);

      // Remove all related sub compositions
      this.removeRelatedSubstitutionCompositions(dto.substitutionCompositions, composition, table);
    }

    // Update or completely remove row
    this.removeCompositionAndInterval(row, composition);

    // Update other rows
    this.tableRenderer.nextRowCommand({
      rowId: row.id,
      command: (rowData: ScheduleRow) => {
        this.sumCalculator.calculateSum(rowData, dto.mainCompositions, table.from, table.to);
        this.cellEnabledSetter.processRow(rowData, table.from, table.to)
      }
    });
  }

  private updateRelatedMainCompositions(mainShiftCompositions: Composition[],
                                        substitutionShiftCompositions: Composition[],
                                        table: TableData) {
    mainShiftCompositions.forEach(composition => {

      const rows = <ScheduleRow[]> table.findRowGroup(composition.shiftId).rows;

      for (let row of rows) {

        if (row.id === composition.employeeId && !row.isSubstitution) {
          row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, substitutionShiftCompositions);
        }

      }

    });
  }

  private removeRelatedSubstitutionCompositions(substitutionShiftCompositions: SubstitutionComposition[],
                                                mainComposition: Composition,
                                                table: TableData) {

    let index = 0;
    while (index < substitutionShiftCompositions.length) {

      const composition = substitutionShiftCompositions[index];

      if (composition.mainComposition.id === mainComposition.id) {

        const rows = <ScheduleRow[]> table.findRowGroup(composition.shiftId).rows;

        for (let row of rows) {
          if (row.id === composition.employeeId && row.isSubstitution) {
            this.removeCompositionAndInterval(row, composition);
          }
        }

        substitutionShiftCompositions.splice(index, 1);

      } else {
        index++;
      }

    }
  }

  removeCompositionAndInterval(row: ScheduleRow,
                               composition: Composition) {
    const group = row.group;
    const rows = <ScheduleRow[]> group.rows;

    // Remove composition from row's compositions
    removeFromArray(row.compositions, value => value.id === composition.id);

    if (row.compositions.length == 0) {
      // If no compositions remain then remove row from group
      removeFromArray(rows, value => value.id === row.id
        && value.isSubstitution === row.isSubstitution
        && value.position.id === row.position.id
      );

      this.tableRenderer.renderRowGroup(group.id);
    } else {
      this.removeCompositionIntervals(composition, row.intervals);
    }
  }

  private removeCompositionIntervals(composition: Composition,
                                     intervals: RowInterval[]) {
    let index = 0;
    while (index < intervals.length) {

      const interval = intervals[index];

      if (interval.parentId === composition.id) {
        intervals.splice(index, 1);
      } else {
        index++;
      }

    }
  }
}

function removeFromArray<T>(arr: T[], comparator: (value: T) => boolean) {
  const compositionIndex = arr.findIndex(comparator);
  arr.splice(compositionIndex, 1);
}
