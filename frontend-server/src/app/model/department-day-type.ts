import { IdEntity } from "./interface/id-entity";
import { DayType } from "./day-type";
import { HasDayTypeIdAndTime } from "./interface/has-day-type-id-and-time";

export class DepartmentDayType implements IdEntity, HasDayTypeIdAndTime {
  id:               number;
  dayType:          DayType;
  startTime:        string;
  breakStartTime:   string;
  breakEndTime:     string;
  endTime:          string;
  dayTypeId:        number;
}
