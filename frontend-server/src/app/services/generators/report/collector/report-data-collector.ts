import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { DayType } from "../../../../model/day-type";
import { BasicDto } from "../../../../model/dto/basic-dto";
import { Employee } from "../../../../model/employee";
import { WorkDay } from "../../../../model/workday";
import { SummationDto } from "../../../../model/dto/summation-dto";
import { MainShiftComposition } from "../../../../model/main-shift-composition";
import { ReportData } from "../model/report-row-data";
import { SummationColumn } from "../../../../model/summation-column";

export interface ReportDataCollector {
  collect(calendarDays: CalendarDay[],
          dayTypes: DayType[],
          schedule: BasicDto<Employee, WorkDay>[],
          summations: SummationDto[],
          summationColumns: SummationColumn[],
          compositions: MainShiftComposition[]): ReportData;

  REPORT_TYPE: string;
}
