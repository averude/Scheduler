import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";

export class SpecialCalendarDate implements IdEntity, HasName {
  id:       number;
  dateType: string;
  date:     string;
  name:     string;
}

export const HOLIDAY: string = "holiday";
export const EXTRA_WEEKEND: string = "extra_weekend";
export const EXTRA_WORK_DAY: string = "extra_work_day";
export const WEEKEND: string = "weekend";

export const SPECIAL_CALENDAR_DATE_TYPES: string[] = [HOLIDAY, EXTRA_WEEKEND, EXTRA_WORK_DAY];
