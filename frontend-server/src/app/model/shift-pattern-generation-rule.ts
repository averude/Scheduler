import { DepartmentDayType } from "./department-day-type";

export class ShiftPatternGenerationRule {
  id:                   number;
  orderId:              number;
  shiftPatternId:       number;
  onDayTypeId:          number;
  useDepartmentDayType: DepartmentDayType;
  type:                 GenerationRuleType;
}

export enum GenerationRuleType {
  HOLIDAY = "holiday",
  EXTRA_WEEKEND = "extra_weekend",
  EXTRA_WORK_DAY = "extra_work_day",
  WEEKEND = "weekend",
  // BEFORE_HOLIDAY = "before_holiday"
}
