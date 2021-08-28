import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { Position } from "../../../../model/position";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Composition } from "../../../../model/composition";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { CellCollector } from "../../../../services/collectors/cell-collector";
import { Injectable } from "@angular/core";
import { createNewRow, exchangeComposition, isUpdateOperation } from "../../../../services/collectors/utils";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";

@Injectable()
export class TableRowProcessor {

  constructor(private intervalCreator: IntervalCreator,
              private cellCollector: CellCollector) {}

  insertNewOrUpdateExistingRow(group: RowGroup,
                               dto: EmployeeScheduleDTO,
                               calendarDays: CalendarDay[],
                               composition: Composition,
                               position:    Position,
                               workingNorm: number,
                               isSubstitution: boolean,
                               isUpdateOperationPredicate: (row: ScheduleRow) => boolean): ScheduleRow {
    return group.createOrUpdateRow(
      (val => val.id - dto.parent.id),
      (val => val.value.position.id === composition.positionId && val.value.isSubstitution === isSubstitution),
      (row => isUpdateOperation(isUpdateOperationPredicate(row), row, isSubstitution, composition)),
      (row => {
        row.value.compositions.push(composition);
        row.value.compositions.sort((a, b) => a.from.diff(b.from));
        return row;
      }),
      (() => {
        const newRow = createNewRow(this.cellCollector, group, calendarDays, dto, position, workingNorm, isSubstitution);
        newRow.value.compositions = [composition];
        return newRow;
      })
    );
  }

  updateRow(row: ScheduleRow,
            composition: Composition,
            dto: EmployeeScheduleDTO) {
    exchangeComposition(row.value.compositions, composition);

    if (row.value.isSubstitution) {
      exchangeComposition(dto.substitutionCompositions, composition);
      row.value.intervals = row.value.compositions.map(value => convertCompositionToInterval(value));
    } else {
      exchangeComposition(dto.mainCompositions, composition);
      row.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.value.compositions, dto.substitutionCompositions);
    }
  }
}