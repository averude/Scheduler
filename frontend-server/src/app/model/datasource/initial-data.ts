import { Shift } from "../shift";
import { Position } from "../position";
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
  calendarDays: CalendarDay[]; // TODO: check possible issue
  specialCalendarDates: SpecialCalendarDate[];
}

export class WorkingNormInitialData {
  shifts:           Shift[];
  from:             Moment;
  to:               Moment;
  workingNormDTOs:  BasicDTO<Shift, WorkingNorm>[];
  shiftPatterns:    ShiftPattern[];
}
