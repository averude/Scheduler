import { Employee } from "../employee";
import { WorkDay } from "../workday";
import { MainComposition, SubstitutionComposition } from "../composition";

export class EmployeeScheduleDTO {
  employee: Employee;
  mainCompositions: MainComposition[];
  substitutionCompositions: SubstitutionComposition[];
  workDays: WorkDay[];
}
