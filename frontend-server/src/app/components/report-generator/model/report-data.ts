import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { WorkingNorm } from "../../../model/working-norm";
import { SpecialCalendarDate } from "../../../model/special-calendar-date";
import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { DayType } from "../../../model/day-type";
import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { ReportSheetDTO } from "../../../model/dto/report-sheet-dto";

export class ReportData {
  schedule:     EmployeeScheduleDTO[];
  workingNorms: WorkingNorm[];
  calendarDays: SpecialCalendarDate[];
  summationDTO: EmployeeWorkStatDTO[];
  dayTypes:     DayType[];
  shifts:       Shift[];
  positions:    Position[];
  reportSheets: ReportSheetDTO[];
}
