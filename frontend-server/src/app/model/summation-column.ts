import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";

export class SummationColumn implements IdEntity, HasName {
  id:           number;
  name:         string;
  onlyHolidays: boolean;
  columnType:   SummationType;
  specialCalendarDateTypes: string[];
}

export enum SummationType {
  COUNT = "count",
  HOURS_SUM = "hours_sum"
}

export const SUMMATION_COLUMN_TYPES: string[] = [SummationType.COUNT, SummationType.HOURS_SUM];
