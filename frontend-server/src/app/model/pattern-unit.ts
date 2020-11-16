import { IdEntity } from "./interface/id-entity";
import { DayType } from "./day-type";
import { HasDayTypeAndTime } from "./interface/has-day-type-and-time";

export class PatternUnit implements IdEntity, HasDayTypeAndTime {
  id:             number;
  patternId:      number;
  orderId:        number;
  dayType:        DayType;
  startTime:      string;
  breakStartTime: string;
  breakEndTime:   string;
  endTime:        string;
}
