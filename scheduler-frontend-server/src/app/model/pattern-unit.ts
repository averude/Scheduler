import { IdEntity } from "./interface/id-entity";
import { HasDayTypeIdAndTime } from "./interface/has-day-type-id-and-time";

export class PatternUnit implements IdEntity, HasDayTypeIdAndTime {
  id:             number;
  patternId:      number;
  orderId:        number;
  dayTypeId:      number;
  startTime:      string;
  breakStartTime: string;
  breakEndTime:   string;
  endTime:        string;
}
