import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { ReportSheetDTO } from "../../../model/dto/report-sheet-dto";
import { SummationColumn } from "../../../model/summation-column";
import { ReportCollectorStrategy } from "../collectors/strategy/report-collector-strategy";
import { Employee } from "../../../model/employee";
import { DayType } from "../../../model/day-type";
import { Shift } from "../../../model/shift";
import { Position } from "../../../model/position";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { WorkingNorm } from "../../../model/working-norm";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { SpecialCalendarDate } from "../../../model/special-calendar-date";

export class ReportInitialData {
  dayTypeMap:       Map<number, DayType>;
  shifts:           Shift[];
  positions:        Position[];
  positionMap:      Map<number, Position>;
  scheduleDTOs:     EmployeeScheduleDTO[];
  workingNorms:     WorkingNorm[];
  workingNormsMap:  Map<number, WorkingNorm>;
  specialCalendarDates: SpecialCalendarDate[];
  calendarDays:     CalendarDay[]; // TODO: check possible issue
  employeeMap:      Map<number, Employee>;
  summationDTOMap:  Map<number, EmployeeWorkStatDTO>;
  reportSheets:     ReportSheetDTO[];
  summationColumns: SummationColumn[];
  useReportLabel:   boolean;
  collectorStrategy: ReportCollectorStrategy;
}
