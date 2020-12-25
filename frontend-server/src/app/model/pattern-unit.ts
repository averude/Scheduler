import { IdEntity } from "./interface/id-entity";
import { DayType } from "./day-type";
import { HasDayTypeAndTime } from "./interface/has-day-type-and-time";

export class PatternUnit implements IdEntity, HasDayTypeAndTime, HasOrder {
  id:             number;
  patternId:      number;
  orderId:        number;
  dayType:        DayType;
  startTime:      string;
  breakStartTime: string;
  breakEndTime:   string;
  endTime:        string;
}

export interface HasOrder {
  orderId: number;
}
