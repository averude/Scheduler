import { WorkDay } from "../../../model/workday";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { convertTimeStringToMin } from "../../../shared/utils/utils";
import { HasDayTypeAndTime } from "../../../model/interface/has-day-type-and-time";
import { ScheduleCell } from "../../../model/ui/schedule-table/table-data";

export function createOrUpdateCell(usePreviousValue: boolean,
                                   unit: HasDayTypeAndTime,
                                   cell: Cell) {
  if (cell.value) {
    updateWorkDayInCell(usePreviousValue, cell, unit);
  } else {
    createWorkDayInCell(cell, unit);
  }
}

function createWorkDayInCell(cell: Cell,
                             unit: HasDayTypeAndTime) {
  const scheduleCell  = <ScheduleCell> cell;
  const employee      = scheduleCell.parent.employee;

  cell.value                    = new WorkDay();
  cell.value.departmentId       = employee.departmentId;
  cell.value.employeeId         = employee.id;
  cell.value.startTime          = convertTimeStringToMin(unit.startTime);
  cell.value.endTime            = convertTimeStringToMin(unit.endTime);
  cell.value.breakStartTime     = convertTimeStringToMin(unit.breakStartTime);
  cell.value.breakEndTime       = convertTimeStringToMin(unit.breakEndTime);
  cell.value.date               = cell.date.isoString;
  cell.value.scheduledDayTypeId = unit.dayType.id;
}

function updateWorkDayInCell(usePreviousValue: boolean,
                             cell: Cell,
                             unit: HasDayTypeAndTime) {
  if (!usePreviousValue) {
    cell.value.startTime      = convertTimeStringToMin(unit.startTime);
    cell.value.endTime        = convertTimeStringToMin(unit.endTime);
    cell.value.breakStartTime = convertTimeStringToMin(unit.breakStartTime);
    cell.value.breakEndTime   = convertTimeStringToMin(unit.breakEndTime);
    cell.value.scheduledDayTypeId = unit.dayType.id;
  } else {
    cell.value.actualDayTypeId = unit.dayType.id;
  }
}
