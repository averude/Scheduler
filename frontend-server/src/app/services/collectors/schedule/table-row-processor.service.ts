import { Cell, Row, RowGroup } from "../../../model/ui/schedule-table/table-data";
import { Position } from "../../../model/position";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { Composition } from "../../../model/main-shift-composition";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { binarySearchLastRepeatableIndex } from "../../../shared/utils/collection-utils";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { CellCollector } from "../cell-collector";
import { Injectable } from "@angular/core";
import { WorkDay } from "../../../model/workday";

@Injectable()
export class TableRowProcessor {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private compositionDivider: IntervalCreator,
              private cellCollector: CellCollector) {}

  initRowInsert(group: RowGroup,
                dto: EmployeeScheduleDTO,
                calendarDays: CalendarDay[],
                composition:  Composition,
                position:     Position,
                workingNorm:  number,
                isSubstitution: boolean,
                isUpdateOperationPredicate: (row: Row) => boolean) {
    let result;

    const rowData = <Row[]> group.rows;
    const lastRow = rowData[rowData.length - 1];

    if (this.isUpdateOperation(isUpdateOperationPredicate(lastRow), lastRow, isSubstitution, composition)) {
      lastRow.compositions.push(composition);
      result = lastRow;
    } else {
      const newRow = this.createNewRow(group, calendarDays, dto, position, workingNorm, isSubstitution);
      newRow.compositions = [composition];
      rowData.push(newRow);
      result = newRow;
    }

    return result;
  }

  insertNewOrUpdateExistingRow(group: RowGroup,
                               dto: EmployeeScheduleDTO,
                               calendarDays: CalendarDay[],
                               composition: Composition,
                               position:    Position,
                               workingNorm: number,
                               isSubstitution: boolean,
                               isUpdateOperationPredicate: (row: Row) => boolean): Row {
    let processedRow;

    const rows = <Row[]> group.rows;

    if (!rows) {
      return;
    }

    const rowIndex = binarySearchLastRepeatableIndex(rows, (mid => mid.id - dto.parent.id), (value => value.id - dto.parent.id));
    if (rowIndex >= 0) {

      const row = rows[rowIndex];
      if (this.isUpdateOperation(isUpdateOperationPredicate(row), row, isSubstitution, composition)) {

        row.compositions.push(composition);
        row.compositions.sort((a, b) => a.from.diff(b.from));
        processedRow = row;

      } else {

        const newRow = this.createNewRow(group, calendarDays, dto, position, workingNorm, isSubstitution);
        newRow.compositions = [composition];
        rows.splice(rowIndex + 1, 0, newRow);
        processedRow = newRow;

      }

    } else {

      const newRow = this.createNewRow(group, calendarDays, dto, position, workingNorm, isSubstitution);
      newRow.compositions = [composition];
      group.addRow(newRow);
      processedRow = newRow;

    }

    return processedRow;
  }

  updateRow(row: Row,
            composition: Composition,
            dto: EmployeeScheduleDTO) {
    this.exchangeComposition(row.compositions, composition);

    if (row.isSubstitution) {
      this.exchangeComposition(dto.substitutionShiftCompositions, composition);
      row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
    } else {
      this.exchangeComposition(dto.mainShiftCompositions, composition);
      row.intervals = this.compositionDivider.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionShiftCompositions);
    }
  }

  private exchangeComposition(compositions: Composition[], newComposition: Composition) {
    const oldCompositionIndex = compositions.findIndex(composition => composition.id === newComposition.id);
    if (oldCompositionIndex >= 0) {
      compositions.splice(oldCompositionIndex, 1, newComposition);
    } else {
      compositions.push(newComposition);
      compositions.sort((a,b) => a.from.diff(b.from));
    }
  }

  private isUpdateOperation(updateRows: boolean,
                            row: Row,
                            isSubstitution: boolean,
                            composition: Composition) {
    return row && updateRows && !this.xor(row.isSubstitution, isSubstitution)
      && row.group.id === composition.shiftId && row.id === composition.employeeId;
  }

  private createNewRow(group: RowGroup,
                       calendarDays: CalendarDay[],
                       dto: EmployeeScheduleDTO,
                       position: Position,
                       workingNorm: number,
                       isSubstitution: boolean) {
    const row = {} as Row;
    row.id = dto.parent.id;
    row.group = group;
    row.employee = dto.parent;
    row.position = position;
    row.isSubstitution = isSubstitution;
    row.cellData = this.cellCollector.collect<WorkDay, Cell>(calendarDays, dto.collection, false);
    row.cellData.forEach((cell: Cell) => cell.row = row);
    row.workingNorm = workingNorm;
    return row;
  }

  private xor(a: boolean, b: boolean): boolean {
    return ( a || b ) && !( a && b );
  }
}
