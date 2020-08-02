import { WorkDay } from "../../model/workday";
import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";
import { convertTimeStringToMin } from "../../shared/utils/time-converter";
import { HasDayTypeIdAndTime } from "../../model/interface/has-day-type-id-and-time";

export function createOrUpdateCell(usePreviousValue: boolean,
                                   employeeId: number,
                                   unit: HasDayTypeIdAndTime,
                                   cell: CellData) {
  if (cell.value) {
    updateWorkDayInCell(usePreviousValue, cell, unit);
  } else {
    createWorkDayInCell(employeeId, cell, unit);
  }
}

function createWorkDayInCell(employeeId: number,
                             cell: CellData,
                             unit: HasDayTypeIdAndTime) {
  cell.value                = new WorkDay();
  cell.value.employeeId     = employeeId;
  cell.value.startTime      = convertTimeStringToMin(unit.startTime);
  cell.value.endTime        = convertTimeStringToMin(unit.endTime);
  cell.value.breakStartTime = convertTimeStringToMin(unit.breakStartTime);
  cell.value.breakEndTime   = convertTimeStringToMin(unit.breakEndTime);
  cell.value.date           = cell.date.isoString;
  cell.value.dayTypeId      = unit.dayTypeId;
}

function updateWorkDayInCell(usePreviousValue: boolean,
                             cell: CellData,
                             unit: HasDayTypeIdAndTime) {
  if (!usePreviousValue) {
    cell.value.startTime      = convertTimeStringToMin(unit.startTime);
    cell.value.endTime        = convertTimeStringToMin(unit.endTime);
    cell.value.breakStartTime = convertTimeStringToMin(unit.breakStartTime);
    cell.value.breakEndTime   = convertTimeStringToMin(unit.breakEndTime);
  }
  cell.value.dayTypeId = unit.dayTypeId;
}
