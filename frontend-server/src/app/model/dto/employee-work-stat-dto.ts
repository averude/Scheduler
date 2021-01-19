import { Employee } from "../employee";
import { SummationResult } from "./summation-dto";

export class EmployeeWorkStatDTO {
  employee: Employee;
  shiftId: number;
  positionStats: EmployeePositionStat[];
}

export class EmployeePositionStat {
  positionId: number;
  summations: SummationResult[];
}
