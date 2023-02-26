import { EmployeeScheduleDTO } from "../employee-schedule-dto";
import { WorkingNorm } from "../../working-norm";
import { SpecialCalendarDate } from "../../special-calendar-date";

export class CalendarDataDTO {
  schedule: EmployeeScheduleDTO[];
  workingNorms: WorkingNorm[];
  specialCalendarDates: SpecialCalendarDate[];
}
