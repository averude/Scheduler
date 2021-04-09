import { IdEntity } from "./interface/id-entity";
import { DayType } from "./day-type";
import { HasDayTypeAndTime } from "./interface/has-day-type-and-time";
import { HasName } from "./interface/has-name";
import { HasDepartmentId } from "./interface/has-department-id";

export class DepartmentDayType implements IdEntity, HasName, HasDayTypeAndTime, HasDepartmentId {
  id:               number;
  departmentId:     number;
  dayType:          DayType;
  name:             string;
  startTime:        string;
  breakStartTime:   string;
  breakEndTime:     string;
  endTime:          string;
}
