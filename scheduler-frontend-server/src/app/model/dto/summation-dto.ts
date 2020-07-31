import { Employee } from "../employee";

export class SummationDto {
  employee: Employee;
  from:     string;
  to:       string;
  results:  SummationResult[];
}

export class SummationResult {
  summationColumnId:  number;
  type:               string;
  value:              number;
}
