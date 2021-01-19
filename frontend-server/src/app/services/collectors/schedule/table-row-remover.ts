import { Row, RowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
import { Composition, SubstitutionShiftComposition } from "../../../model/main-shift-composition";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { NotificationsService } from "angular2-notifications";
import { Injectable } from "@angular/core";

@Injectable()
export class TableRowRemover {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private tableRenderer: TableRenderer,
              private divider: IntervalCreator,
              private notificationsService: NotificationsService) {}

  removeRow(groupData: RowGroup,
            row: Row,
            composition: Composition,
            dtos: EmployeeScheduleDTO[]) {
    const table = groupData.table;
    const rows = groupData.rows;

    const dto = binarySearch(dtos, (mid => mid.parent.id - composition.employeeId));

    if (row.isSubstitution) {
      const index = dto.substitutionShiftCompositions.findIndex(value => value.id === composition.id);
      dto.substitutionShiftCompositions.splice(index, 1);

      this.updateRelatedMainCompositions(dto.mainShiftCompositions, dto.substitutionShiftCompositions, table);
    } else {
      const mainIndex = dto.mainShiftCompositions.findIndex(value => value.id === composition.id);

      this.removeRelatedSubstitutionCompositions(dto.substitutionShiftCompositions, dto.mainShiftCompositions[mainIndex], table);

      dto.mainShiftCompositions.splice(mainIndex, 1);
    }

    this.removeCompositionAndInterval(row, composition);

    this.notificationsService.success('Removed');
  }

  private updateRelatedMainCompositions(mainShiftCompositions: Composition[],
                                        substitutionShiftCompositions: Composition[],
                                        table: TableData) {
    mainShiftCompositions.forEach(composition => {

      const rows = <Row[]> table.findRowGroup(composition.shiftId).rows;

      for (let row of rows) {

        if (row.id === composition.employeeId && !row.isSubstitution) {
          row.intervals = this.divider.getEmployeeShiftIntervalsByArr(row.compositions, substitutionShiftCompositions);
          this.cellEnabledSetter.processRow(row, table.from, table.to);
        }

      }

    });
  }

  private removeRelatedSubstitutionCompositions(substitutionShiftCompositions: SubstitutionShiftComposition[],
                                                mainComposition: Composition,
                                                table: TableData) {

    let index = 0;
    while (index < substitutionShiftCompositions.length) {

      const composition = substitutionShiftCompositions[index];

      if (composition.mainShiftComposition.id === mainComposition.id) {

        const rows = <Row[]> table.findRowGroup(composition.shiftId).rows;

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

  removeCompositionAndInterval(row: Row,
                               composition: Composition) {
    const group = row.group;
    const rows = group.rows;

    const compositionIndex = row.compositions.findIndex(value => value.id === composition.id);
    row.compositions.splice(compositionIndex, 1);

    if (row.compositions.length == 0) {
      const rowIndex = rows.indexOf(row);
      rows.splice(rowIndex, 1);

      this.tableRenderer.renderRowGroup(group.id);
    } else {
      this.removeCompositionIntervals(composition, row.intervals);

      this.cellEnabledSetter.processRow(row, group.table.from, group.table.to);
    }

    this.tableRenderer.renderRow(row.id);
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
