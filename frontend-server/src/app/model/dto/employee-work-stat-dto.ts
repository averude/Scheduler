export class EmployeeWorkStatDTO {
  employeeId: number;
  shiftId: number;
  mainPositionId: number;
  positionStats: EmployeePositionStat[];
}

export class SummationResult {
  summationColumnId: number;
  type: string;
  value: number;
}

export enum SummationMode {
  OVERALL = "overall",
  PER_POSITION = "per_position"
}

export class EmployeePositionStat {
  positionId: number;
  summations: SummationResult[];
}
