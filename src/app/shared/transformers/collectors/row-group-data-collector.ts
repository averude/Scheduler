import { Shift } from "../../../model/shift";
import { ShiftComposition } from "../../../model/shift-composition";
import { ScheduleDto } from "../../../model/dto/schedule-dto";
import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { DayType } from "../../../model/day-type";
import { DayTypeGroup } from "../../../model/day-type-group";
import { CalendarDay } from "../../../model/ui/calendar-day";
import { WorkingTime } from "../../../model/working-time";
import { RowGroupData } from "../../../model/ui/row-group-data";
import { RowDataCollector } from "./row-data-collector";

export class RowGroupDataCollector {

  constructor(private rowDataCollector: RowDataCollector) {
  }

  getRowGroupData(shifts: Shift[],
                  shiftComposition: ShiftComposition[],
                  schedule: ScheduleDto[],
                  employees: Employee[],
                  positions: Position[],
                  dayTypes: DayType[],
                  dayTypeGroups: DayTypeGroup[],
                  daysInMonth: CalendarDay[],
                  shiftsWorkingTime: WorkingTime[]): RowGroupData[] {
    return shifts.map(shift => {
      let rowGroup = new RowGroupData();
      let shiftWorkingTime = this.getShiftWorkingTime(shift.id, shiftsWorkingTime);
      rowGroup.shift = shift;
      rowGroup.workingTimeNorm = shiftWorkingTime;
      rowGroup.rows = this.rowDataCollector
        .getRowData(shift.id, shiftComposition, schedule, employees, positions,
          dayTypes, dayTypeGroups, daysInMonth, shiftWorkingTime, shiftsWorkingTime);
      return rowGroup;
    })
  }

  getShiftWorkingTime(shiftId: number,
                      shiftsWorkingTime: WorkingTime[]): number {
    let workingTime = shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
    return workingTime ? workingTime.hours : 0;
  }
}
