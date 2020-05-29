import { IdEntity } from "./interface/id-entity";
import { DayTypeGroup } from "./day-type-group";

export class DayType implements IdEntity {
  id:               number;
  // departmentId:     number;
  // enterpriseId:     number;
  dayTypeGroup:     DayTypeGroup;
  name:             string;
  label:            string;
  startTime:        string;
  breakStartTime:   string;
  breakEndTime:     string;
  endTime:          string;
  usePreviousValue: boolean;
}
