import { ScheduleCell, ScheduleRow, ScheduleRowValue } from "../../../../model/ui/schedule-table/table-data";
import { Position } from "../../../../model/position";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Composition } from "../../../../model/composition";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { CellCollector } from "../../../../services/collectors/cell-collector";
import { Injectable } from "@angular/core";
import { exchangeComposition } from "../../../../services/collectors/utils";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";
import { WorkDay } from "../../../../model/workday";

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
                               isSubstitution: boolean): ScheduleRow {
    const value = new ScheduleRowValue();
    value.employee = dto.parent;
    value.position = position;
    value.compositions = [composition];
    value.isSubstitution = isSubstitution;
    value.workingNorm = workingNorm;

    const result = <ScheduleRow> group.addOrMerge(value.employee.id, value, (row => {
      row.value.compositions.push(composition);
      row.value.compositions.sort((a, b) => a.from.diff(b.from));
    }));

    result.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(calendarDays, dto.collection, false);
    result.cells.forEach((cell: ScheduleCell) => cell.parent = result);

    return result;
  }

  updateRow(row: ScheduleRow,
            composition: Composition,
            dto: EmployeeScheduleDTO) {
    const rowValue = row.value;

    exchangeComposition(rowValue.compositions, composition);

    if (rowValue.isSubstitution) {
      exchangeComposition(dto.substitutionCompositions, composition);
      rowValue.intervals = rowValue.compositions.map(value => convertCompositionToInterval(value));
    } else {
      exchangeComposition(dto.mainCompositions, composition);
      rowValue.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(rowValue.compositions, dto.substitutionCompositions);
    }
  }
}
