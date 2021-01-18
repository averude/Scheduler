import { Employee } from "../employee";
import { BasicDto } from "./basic-dto";

export class SummationDto extends BasicDto<Employee, SummationResult> {
  from:       string;
  to:         string;
  positionId: number;
  shiftId:    number;
}

export class SummationResult {
  summationColumnId:  number;
  type:               string;
  value:              number;
}

export enum SummationMode {
  OVERALL       = "overall",
  PER_POSITION  = "per_position"
}
