import { ScheduleCell, ScheduleRow } from "../../model/ui/schedule-table/table-data";
import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";
import { Position } from "../../model/position";
import { WorkDay } from "../../model/workday";
import { Composition } from "../../model/composition";
import { CellCollector } from "./cell-collector";
import { RowGroup } from "../../lib/ngx-schedule-table/model/data/row-group";

export function createNewRow(cellCollector: CellCollector,
                             group: RowGroup,
                             calendarDays: CalendarDay[],
                             dto: EmployeeScheduleDTO,
                             position: Position,
                             workingNorm: number,
                             isSubstitution: boolean) {
  const row = ScheduleRow.create(group, dto, position, workingNorm, isSubstitution);
  row.cells = cellCollector.collect<WorkDay, ScheduleCell>(calendarDays, dto.collection, false);
  row.cells.forEach((cell: ScheduleCell) => cell.parent = row);
  return row;
}

export function isUpdateOperation(updateRows: boolean,
                                  row: ScheduleRow,
                                  isSubstitution: boolean,
                                  composition: Composition) {
  return row && updateRows && (row.isSubstitution === isSubstitution)
    && row.parent.id === composition.shiftId && row.id === composition.employeeId
    && row.position.id === composition.positionId;
}

export function exchangeComposition(compositions: Composition[],
                                    newComposition: Composition) {
  const oldCompositionIndex = compositions.findIndex(composition => composition.id === newComposition.id);
  if (oldCompositionIndex >= 0) {
    compositions.splice(oldCompositionIndex, 1, newComposition);
  } else {
    compositions.push(newComposition);
    compositions.sort((a,b) => a.from.diff(b.from));
  }
}
