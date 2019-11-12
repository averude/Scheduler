import { Shift } from "../../model/shift";
import { ShiftComposition } from "../../model/shift-composition";
import { Employee } from "../../model/employee";
import { ScheduleDto } from "../../model/dto/schedule-dto";
import { Position } from "../../model/position";
import { ShiftPattern } from "../../model/shift-pattern";
import { DayType } from "../../model/day-type";
import { DayTypeGroup } from "../../model/day-type-group";
import { WorkingTime } from "../../model/working-time";
import { CalendarDay } from "../../model/ui/calendar-day";
import { RowGroupData } from "../../model/ui/row-group-data";
import { Injectable } from "@angular/core";
import { RowDataCollector } from "./collectors/row-data-collector";
import { RowGroupDataCollector } from "./collectors/row-group-data-collector";

@Injectable()
export class DataTransformer {

  private rowDataCollector:       RowDataCollector      = new RowDataCollector();
  private rowGroupDataCollector:  RowGroupDataCollector = new RowGroupDataCollector(this.rowDataCollector);

  constructor() {
  }

  getData(shifts: Shift[],
          shiftSchedule: ShiftComposition[],
          employees: Employee[],
          schedule: ScheduleDto[],
          positions: Position[],
          patterns: ShiftPattern[],
          dayTypes: DayType[],
          dayTypeGroups: DayTypeGroup[],
          shiftsWorkingTime: WorkingTime[],
          daysInMonth: CalendarDay[]): RowGroupData[] {

    return this.rowGroupDataCollector
      .getRowGroupData(
        shifts,
        shiftSchedule,
        schedule,
        employees,
        positions,
        dayTypes,
        dayTypeGroups,
        daysInMonth,
        shiftsWorkingTime
      );
  }
}
