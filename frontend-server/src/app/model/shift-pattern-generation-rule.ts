import { DepartmentDayType } from "./department-day-type";

export class ShiftPatternGenerationRule {
  id:                   number;
  orderId:              number;
  shiftPatternId:       number;
  onDayTypeId:          number;
  useDepartmentDayType: DepartmentDayType;
  type:                 GenerationRuleType;
  dayOfWeek:            number;
}

export enum GenerationRuleType {
  HOLIDAY = "holiday",
  EXTRA_WEEKEND = "extra_weekend",
  EXTRA_WORK_DAY = "extra_work_day",
  WEEKEND = "weekend",
  DAY_OF_WEEK = "day_of_week"
  // BEFORE_HOLIDAY = "before_holiday"
}

export const PATTERN_RULE_TYPES: string[] = [
  GenerationRuleType.HOLIDAY,
  GenerationRuleType.EXTRA_WEEKEND,
  GenerationRuleType.EXTRA_WORK_DAY,
  GenerationRuleType.WEEKEND,
  GenerationRuleType.DAY_OF_WEEK
];
