import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { DayType } from "../../../model/day-type";
import { Position } from "../../../model/position";
import { SummationDto } from "../../../model/dto/summation-dto";
import { ReportData } from "../../generators/report/model/report-row-data";
import { SummationColumn } from "../../../model/summation-column";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { Shift } from "../../../model/shift";

export interface ReportDataCollector {
  collect(calendarDays: CalendarDay[],
          dayTypes: DayType[],
          shifts: Shift[],
          positions: Position[],
          schedule: EmployeeScheduleDTO[],
          summations: SummationDto[],
          summationColumns: SummationColumn[],
          useReportLabel?: boolean): ReportData;

  REPORT_TYPE: string;
}
