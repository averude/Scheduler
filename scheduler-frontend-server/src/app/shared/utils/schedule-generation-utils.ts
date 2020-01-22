import { PatternUnit } from "../../model/pattern-unit";
import { WorkDay } from "../../model/workday";
import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";

export function createOrUpdateCell(usePreviousValue: boolean,
                                   employeeId: number,
                                   unit: PatternUnit,
                                   cell: CellData) {
  if (cell.value) {
    updateWorkDayInCell(usePreviousValue, cell, unit);
  } else {
    createWorkDayInCell(employeeId, cell, unit);
  }
}

function createWorkDayInCell(employeeId: number,
                             cell: CellData,
                             unit: PatternUnit) {
  cell.value                = new WorkDay();
  cell.value.employeeId     = employeeId;
  cell.value.holiday        = cell.date.holiday;
  cell.value.startTime      = unit.startTime;
  cell.value.endTime        = unit.endTime;
  cell.value.breakStartTime = unit.breakStartTime;
  cell.value.breakEndTime   = unit.breakEndTime;
  cell.value.date           = cell.date.isoString;
  cell.value.dayTypeId      = unit.dayTypeId;
}

function updateWorkDayInCell(usePreviousValue: boolean,
                             cell: CellData,
                             unit: PatternUnit) {
  if (!usePreviousValue) {
    cell.value.startTime      = unit.startTime;
    cell.value.endTime        = unit.endTime;
    cell.value.breakStartTime = unit.breakStartTime;
    cell.value.breakEndTime   = unit.breakEndTime;
  }
  cell.value.dayTypeId = unit.dayTypeId;
  cell.value.holiday   = cell.date.holiday;
}
