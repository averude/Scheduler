import { ScheduleCell, ScheduleRow, ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { Position } from "../../../model/position";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { Composition } from "../../../model/composition";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { CellCollector } from "../cell-collector";
import { Injectable } from "@angular/core";
import { WorkDay } from "../../../model/workday";
import { InitialData } from "../../../model/datasource/initial-data";

@Injectable()
export class TableRowProcessor {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private intervalCreator: IntervalCreator,
              private cellCollector: CellCollector) {}

  fillRows<T extends Composition>(initData: InitialData,
                                  dto: EmployeeScheduleDTO,
                                  compositions: T[],
                                  isSubstitution: boolean,
                                  rowGroupConsumer:  (composition: T) => ScheduleRowGroup,
                                  workingNormConsumer: (composition: T) => number) {
    for (const composition of compositions) {
      const position = initData.positionsMap.get(composition.positionId);

      const rowGroup = rowGroupConsumer(composition);
      if (rowGroup) {
        const workingNorm = workingNormConsumer(composition);

        this.initRowInsert(rowGroup, dto, initData.calendarDays,
          composition, position, workingNorm, isSubstitution,
          (row) => row?.position.id === composition.positionId);
      }
    }
  }

  initRowInsert(group: ScheduleRowGroup,
                dto: EmployeeScheduleDTO,
                calendarDays: CalendarDay[],
                composition:  Composition,
                position:     Position,
                workingNorm:  number,
                isSubstitution: boolean,
                isUpdateOperationPredicate: (row: ScheduleRow) => boolean) {
    let result;

    const rowData = <ScheduleRow[]> group.rows;
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

  insertNewOrUpdateExistingRow(group: ScheduleRowGroup,
                               dto: EmployeeScheduleDTO,
                               calendarDays: CalendarDay[],
                               composition: Composition,
                               position:    Position,
                               workingNorm: number,
                               isSubstitution: boolean,
                               isUpdateOperationPredicate: (row: ScheduleRow) => boolean): ScheduleRow {
    return group.foo(
      val => (val.id - dto.parent.id) + (val.position.id - composition.positionId),
        row => this.isUpdateOperation(isUpdateOperationPredicate(row), row, isSubstitution, composition),
        row => {
          row.compositions.push(composition);
          row.compositions.sort((a, b) => a.from.diff(b.from));
          return row;
        },
      () => {
          const newRow = this.createNewRow(group, calendarDays, dto, position, workingNorm, isSubstitution);
          newRow.compositions = [composition];
          return newRow;
        }
      );
  }

  updateRow(row: ScheduleRow,
            composition: Composition,
            dto: EmployeeScheduleDTO) {
    this.exchangeComposition(row.compositions, composition);

    if (row.isSubstitution) {
      this.exchangeComposition(dto.substitutionCompositions, composition);
      row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
    } else {
      this.exchangeComposition(dto.mainCompositions, composition);
      row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
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
                            row: ScheduleRow,
                            isSubstitution: boolean,
                            composition: Composition) {
    return row && updateRows && !this.xor(row.isSubstitution, isSubstitution)
      && row.group.id === composition.shiftId && row.id === composition.employeeId
      && row.position.id === composition.positionId;
  }

  private createNewRow(group: ScheduleRowGroup,
                       calendarDays: CalendarDay[],
                       dto: EmployeeScheduleDTO,
                       position: Position,
                       workingNorm: number,
                       isSubstitution: boolean) {
    const row = {} as ScheduleRow;
    row.group = group;
    row.id = dto.parent.id;
    row.employee = dto.parent;
    row.position = position;
    row.isSubstitution = isSubstitution;
    row.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(calendarDays, dto.collection, false);
    row.cells.forEach((cell: ScheduleCell) => cell.row = row);
    row.workingNorm = workingNorm;
    return row;
  }

  private xor(a: boolean, b: boolean): boolean {
    return ( a || b ) && !( a && b );
  }
}
