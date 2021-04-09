import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";
import { HasEnterpriseId } from "./interface/has-enterprise-id";

export class SpecialCalendarDate implements IdEntity, HasName, HasEnterpriseId {
  id:           number;
  enterpriseId: number;
  dateType:     CalendarDateType;
  date:         string;
  name:         string;
}

export enum CalendarDateType {
  HOLIDAY = "holiday",
  EXTRA_WEEKEND = "extra_weekend",
  EXTRA_WORK_DAY = "extra_work_day"
}

export const SPECIAL_CALENDAR_DATE_TYPES: string[] = [
  CalendarDateType.HOLIDAY,
  CalendarDateType.EXTRA_WEEKEND,
  CalendarDateType.EXTRA_WORK_DAY
];
