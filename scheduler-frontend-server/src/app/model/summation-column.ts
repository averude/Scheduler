import { IdEntity } from "./interface/id-entity";

export class SummationColumn implements IdEntity {
  id:           number;
  name:         string;
  onlyHolidays: boolean;
  columnType:   string;
  specialCalendarDateTypes: string[];
}

export const COUNT: string = "count";
export const HOURS_SUM: string = "hours_sum";

export const SUMMATION_COLUMN_TYPES: string[] = [COUNT, HOURS_SUM];
