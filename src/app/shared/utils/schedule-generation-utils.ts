import { PatternUnit } from "../../model/pattern-unit";
import { WorkDay } from "../../model/workday";
import { TableCellComponent } from "../../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";

export function createOrUpdateCell(overrideExistingValues: boolean,
                                   employeeId: number,
                                   unit: PatternUnit,
                                   cell: TableCellComponent) {
  if (cell.workDay) {
    updateWorkDayInCell(overrideExistingValues, cell, unit);
  } else {
    createWorkDayInCell(employeeId, cell, unit);
  }
}

function createWorkDayInCell(employeeId: number,
                             cell: TableCellComponent,
                             unit: PatternUnit) {
  cell.workDay            = new WorkDay();
  cell.workDay.employeeId = employeeId;
  cell.workDay.holiday    = cell.day.holiday;
  cell.workDay.hours      = unit.value;
  cell.workDay.date       = cell.day.isoString;
  cell.workDay.dayTypeId  = unit.dayTypeId;
}

function updateWorkDayInCell(overrideExistingValues: boolean,
                             cell: TableCellComponent,
                             unit: PatternUnit) {
  if (overrideExistingValues) {
    cell.workDay.hours   = unit.value;
  }
  cell.workDay.dayTypeId = unit.dayTypeId;
  cell.workDay.holiday   = cell.day.holiday;
}
