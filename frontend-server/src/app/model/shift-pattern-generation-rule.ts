import { DepartmentDayType } from "./department-day-type";

export class ShiftPatternGenerationRule {
  id:                   number;
  orderId:              number;
  shiftPatternId:       number;
  onDayTypeId:          number;
  useDepartmentDayType: DepartmentDayType;
  type:                 string;
}
