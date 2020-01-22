import { WorkDay } from "../workday";

export class ScheduleDto {
  employeeId: number;
  workDays: WorkDay[];
}
