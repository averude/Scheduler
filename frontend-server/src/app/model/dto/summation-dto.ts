import { Employee } from "../employee";
import { BasicDto } from "./basic-dto";

export class SummationDto extends BasicDto<Employee, SummationResult> {
  from:       string;
  to:         string;
}

export class SummationResult {
  summationColumnId:  number;
  type:               string;
  value:              number;
  converted:          boolean = false;
}
