import { IdEntity } from "./interface/id-entity";

export class WorkDay implements IdEntity {
  id:             number;
  employeeId:     number;
  dayTypeId:      number;
  holiday:        boolean;
  startTime:      string;
  breakStartTime: string;
  breakEndTime:   string;
  endTime:        string;
  date:           string;
}
