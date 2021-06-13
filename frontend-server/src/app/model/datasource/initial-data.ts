import { Shift } from "../shift";
import { Position } from "../position";
import { Employee } from "../employee";
import { EmployeeScheduleDTO } from "../dto/employee-schedule-dto";
import { WorkingNorm } from "../working-norm";
import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";
import { DayType } from "../day-type";

export class InitialData {
  dayTypes:     DayType[];
  dayTypeMap:   Map<number, DayType>;
  shifts:       Shift[];
  positions:    Position[];
  positionsMap: Map<number, Position>;
  employees:    Employee[];
  scheduleDTOs: EmployeeScheduleDTO[];
  workingNorms: WorkingNorm[];
  workingNormsMap: Map<number, WorkingNorm>;
  calendarDays: CalendarDay[];
}
