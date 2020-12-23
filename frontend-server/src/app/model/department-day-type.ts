import { IdEntity } from "./interface/id-entity";
import { DayType } from "./day-type";
import { HasDayTypeAndTime } from "./interface/has-day-type-and-time";
import { HasName } from "./interface/has-name";

export class DepartmentDayType implements IdEntity, HasName, HasDayTypeAndTime {
  id:               number;
  dayType:          DayType;
  name:             string;
  startTime:        string;
  breakStartTime:   string;
  breakEndTime:     string;
  endTime:          string;
}
