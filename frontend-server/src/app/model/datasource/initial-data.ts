import { Shift } from "../shift";
import { Position } from "../position";
import { Employee } from "../employee";
import { EmployeeScheduleDTO } from "../dto/employee-schedule-dto";
import { WorkingNorm } from "../working-norm";
import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";
import { DayType } from "../day-type";
import { SpecialCalendarDate } from "../special-calendar-date";
import { Moment } from "moment";
import { BasicDTO } from "../dto/basic-dto";
import { ShiftPattern } from "../shift-pattern";

export class IData {
  dayTypeMap:   Map<number, DayType>;
  shifts:       Shift[];
  positions:    Position[];
  positionMap:  Map<number, Position>;
  scheduleDTOs: EmployeeScheduleDTO[];
  workingNorms: WorkingNorm[];
  workingNormsMap: Map<number, WorkingNorm>;
  calendarDays: CalendarDay[];
  specialCalendarDates: SpecialCalendarDate[];
}

export class InitialData extends IData {
  employees:    Employee[];
  from:         Moment;
  to:           Moment;
}

export class WorkingNormInitialData extends InitialData {
  workingNormDTOs:  BasicDTO<Shift, WorkingNorm>[];
  shiftPatterns:    ShiftPattern[];
}
