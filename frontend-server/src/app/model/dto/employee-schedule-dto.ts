import { WorkDay } from "../workday";
import { MainComposition, SubstitutionComposition } from "../composition";

export class EmployeeScheduleDTO {
  employeeId: number;
  mainCompositions: MainComposition[];
  substitutionCompositions: SubstitutionComposition[];
  workDays: WorkDay[];
}
