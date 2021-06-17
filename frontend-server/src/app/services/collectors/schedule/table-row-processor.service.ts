import { ScheduleCell, ScheduleRow, ScheduleRowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
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
import { xor } from "../../../shared/utils/utils";

@Injectable()
export class TableRowProcessor {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private intervalCreator: IntervalCreator,
              private cellCollector: CellCollector) {}

  fillRows<T extends Composition>(table: TableData,
                                  initData: InitialData,
                                  dto: EmployeeScheduleDTO,
                                  compositions: T[],
                                  isSubstitution: boolean,
                                  workingNormConsumer: (composition: T) => number) {
    for (const composition of compositions) {
      const position = initData.positionMap.get(composition.positionId);

      const rowGroup = table.findRowGroup(composition.shiftId);
      if (rowGroup) {
        const workingNorm = workingNormConsumer(composition);

        rowGroup.init(
          (row => this.isUpdateOperation(row?.position.id === composition.positionId, row, isSubstitution, composition)),
          (row => {
            row.compositions.push(composition);
            return row;
          }),
          (() => {
            const newRow = this.createNewRow(rowGroup, initData.calendarDays, dto, position, workingNorm, isSubstitution);
            newRow.compositions = [composition];
            return newRow;
          })
        );
      }
    }
  }

  insertNewOrUpdateExistingRow(group: ScheduleRowGroup,
                               dto: EmployeeScheduleDTO,
                               calendarDays: CalendarDay[],
                               composition: Composition,
                               position:    Position,
                               workingNorm: number,
                               isSubstitution: boolean,
                               isUpdateOperationPredicate: (row: ScheduleRow) => boolean): ScheduleRow {
    return group.createOrUpdateRow(
      (val => (val.id - dto.parent.id) + (val.position.id - composition.positionId)),
      (row => this.isUpdateOperation(isUpdateOperationPredicate(row), row, isSubstitution, composition)),
      (row => {
        row.compositions.push(composition);
        row.compositions.sort((a, b) => a.from.diff(b.from));
        return row;
      }),
      (() => {
        const newRow = this.createNewRow(group, calendarDays, dto, position, workingNorm, isSubstitution);
        newRow.compositions = [composition];
        return newRow;
      })
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
    return row && updateRows && !xor(row.isSubstitution, isSubstitution)
      && row.group.id === composition.shiftId && row.id === composition.employeeId
      && row.position.id === composition.positionId;
  }

  private createNewRow(group: ScheduleRowGroup,
                       calendarDays: CalendarDay[],
                       dto: EmployeeScheduleDTO,
                       position: Position,
                       workingNorm: number,
                       isSubstitution: boolean) {
    const row = ScheduleRow.create(group, dto, position, workingNorm, isSubstitution);
    row.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(calendarDays, dto.collection, false);
    row.cells.forEach((cell: ScheduleCell) => cell.row = row);
    return row;
  }
}
