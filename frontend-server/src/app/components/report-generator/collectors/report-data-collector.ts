import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { DayType } from "../../../model/day-type";
import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { ReportData } from "../model/report-row";
import { SummationColumn } from "../../../model/summation-column";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";

export interface ReportDataCollector {
  collect(calendarDays: CalendarDay[],
          dayTypes: DayType[],
          shifts: Shift[],
          positions: Position[],
          schedule: EmployeeScheduleDTO[],
          summations: EmployeeWorkStatDTO[],
          summationColumns: SummationColumn[],
          useReportLabel?: boolean): ReportData;

  REPORT_TYPE: string;
}
