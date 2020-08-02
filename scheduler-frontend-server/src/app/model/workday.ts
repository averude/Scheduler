import { IdEntity } from "./interface/id-entity";
import { HasDayTypeIdAndTime } from "./interface/has-day-type-id-and-time";

export class WorkDay implements IdEntity, HasDayTypeIdAndTime {
  id:             number;
  employeeId:     number;
  dayTypeId:      number;
  startTime:      number;
  breakStartTime: number;
  breakEndTime:   number;
  endTime:        number;
  date:           string;
}
