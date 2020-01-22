import { IdEntity } from "./interface/id-entity";

export class DayType implements IdEntity {
  id:               number;
  departmentId:     number;
  dayTypeGroupId:   number;
  name:             string;
  label:            string;
  startTime:        string;
  breakStartTime:   string;
  breakEndTime:     string;
  endTime:          string;
  usePreviousValue: boolean;
}
