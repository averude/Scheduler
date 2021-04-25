import { Shift } from "../shift";
import { Position } from "../position";
import { Employee } from "../employee";
import { EmployeeScheduleDTO } from "../dto/employee-schedule-dto";
import { WorkingNorm } from "../working-norm";
import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";

export class InitialData {
  shifts: Shift[];
  positions: Position[];
  employees: Employee[];
  scheduleDto: EmployeeScheduleDTO[];
  workingNorms: WorkingNorm[];
  calendarDays: CalendarDay[];
}
