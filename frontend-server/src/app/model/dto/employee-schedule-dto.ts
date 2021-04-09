import { BasicDTO } from "./basic-dto";
import { Employee } from "../employee";
import { WorkDay } from "../workday";
import { MainComposition, SubstitutionComposition } from "../composition";

export class EmployeeScheduleDTO extends BasicDTO<Employee, WorkDay>{
  mainCompositions: MainComposition[];
  substitutionCompositions: SubstitutionComposition[];
}
