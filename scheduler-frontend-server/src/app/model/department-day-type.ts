import { IdEntity } from "./interface/id-entity";
import { DayType } from "./day-type";

export class DepartmentDayType implements IdEntity {
  id:               number;
  departmentId:     number;
  // Probably it should be taken like
  // dayTypeId:        number;
  dayType:          DayType;

  startTime:        string;
  breakStartTime:   string;
  breakEndTime:     string;
  endTime:          string;
}
