import { IdEntity } from "./interface/id-entity";

export class SpecialCalendarDate implements IdEntity {
  id:       number;
  dateType: string;
  date:     string;
  name:     string;
}

export const HOLIDAY: string = "holiday";
export const EXTRA_WEEKEND: string = "extra_weekend";
export const EXTRA_WORK_DAY: string = "extra_work_day";

export const SPECIAL_CALENDAR_DATE_TYPES: string[] = [HOLIDAY, EXTRA_WEEKEND, EXTRA_WORK_DAY];
