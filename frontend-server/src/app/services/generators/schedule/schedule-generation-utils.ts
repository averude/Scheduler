import { WorkDay } from "../../../model/workday";
import { CellData } from "../../../lib/ngx-schedule-table/model/data/cell-data";
import { convertTimeStringToMin } from "../../../shared/utils/utils";
import { HasDayTypeAndTime } from "../../../model/interface/has-day-type-and-time";

export function createOrUpdateCell(usePreviousValue: boolean,
                                   employeeId: number,
                                   unit: HasDayTypeAndTime,
                                   cell: CellData) {
  if (cell.value) {
    updateWorkDayInCell(usePreviousValue, cell, unit);
  } else {
    createWorkDayInCell(employeeId, cell, unit);
  }
}

function createWorkDayInCell(employeeId: number,
                             cell: CellData,
                             unit: HasDayTypeAndTime) {
  cell.value                    = new WorkDay();
  cell.value.employeeId         = employeeId;
  cell.value.startTime          = convertTimeStringToMin(unit.startTime);
  cell.value.endTime            = convertTimeStringToMin(unit.endTime);
  cell.value.breakStartTime     = convertTimeStringToMin(unit.breakStartTime);
  cell.value.breakEndTime       = convertTimeStringToMin(unit.breakEndTime);
  cell.value.date               = cell.date.isoString;
  cell.value.scheduledDayTypeId = unit.dayType.id;
}

function updateWorkDayInCell(usePreviousValue: boolean,
                             cell: CellData,
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
