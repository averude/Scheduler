import { BasicDTO } from "./basic-dto";
import { Employee } from "../employee";
import { WorkDay } from "../workday";
import { MainShiftComposition, SubstitutionShiftComposition } from "../main-shift-composition";

export class EmployeeScheduleDTO extends BasicDTO<Employee, WorkDay>{
  mainShiftCompositions: MainShiftComposition[];
  substitutionShiftCompositions: SubstitutionShiftComposition[];
}
