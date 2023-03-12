import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { Composition, SubstitutionComposition } from "../../../../model/composition";
import { RowInterval } from "../../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "../../../../shared/collectors/cell-enabled-setter";
import { TableRenderer } from "../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { Injectable } from "@angular/core";
import { TableSumCalculator } from "../../../../services/calculators/table-sum-calculator.service";
import { removeFromArray } from "../../../../services/utils";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";
import { CalendarInitData } from "../../model/calendar-init-data";

@Injectable()
export class TableRowRemover {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private tableRenderer: TableRenderer,
              private intervalCreator: IntervalCreator) {}

  removeRow(groupData: RowGroup,
            row: ScheduleRow,
            composition: Composition,
            calendarInitData: CalendarInitData) {
    const table = groupData.parent;
    const dto = calendarInitData.calendarDataMaps.scheduleDTOMap.get(composition.employeeId);

    if (row.value.isSubstitution) {
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
        this.sumCalculator.calculateRow(rowData, dto.mainCompositions, calendarInitData);
        this.cellEnabledSetter.processRow(rowData, table.from, table.to)
      }
    });
  }

  private updateRelatedMainCompositions(mainShiftCompositions: Composition[],
                                        substitutionShiftCompositions: Composition[],
                                        table: TableData) {
    mainShiftCompositions.forEach(composition => {

      table.forEachRowInGroup(composition.shiftId,
        (row: ScheduleRow) => {
          if (row.id === composition.employeeId && !row.value.isSubstitution) {
            row.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.value.compositions, substitutionShiftCompositions);
          }
        });

    });
  }

  private removeRelatedSubstitutionCompositions(substitutionShiftCompositions: SubstitutionComposition[],
                                                mainComposition: Composition,
                                                table: TableData) {

    let index = 0;
    while (index < substitutionShiftCompositions.length) {

      const composition = substitutionShiftCompositions[index];

      if (composition.mainComposition.id === mainComposition.id) {

        table.forEachRowInGroup(composition.shiftId,
          (row: ScheduleRow) => {
            if (row.id === composition.employeeId && row.value.isSubstitution) {
              this.removeCompositionAndInterval(row, composition);
            }
          });

        substitutionShiftCompositions.splice(index, 1);

      } else {
        index++;
      }

    }
  }

  removeCompositionAndInterval(row: ScheduleRow,
                               composition: Composition) {
    const group = row.parent;

    // Remove composition from row's compositions
    removeFromArray(row.value.compositions, value => value.id === composition.id);

    if (row.value.compositions.length == 0) {
      // If no compositions remain then remove row from group
      group.removeRows((val: ScheduleRow) => val.id === row.id
        && val.value.isSubstitution === row.value.isSubstitution
        && val.value.position.id === row.value.position.id);

      this.tableRenderer.renderRowGroup(group.id);
    } else {
      this.removeCompositionIntervals(composition, row.value.intervals);
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
