import { IdEntity } from "./interface/id-entity";

export class WorkDay implements IdEntity {
  id:             number;
  employeeId:     number;
  dayTypeId:      number;
  holiday:        boolean;
  startTime:      number;
  breakStartTime: number;
  breakEndTime:   number;
  endTime:        number;
  date:           string;
}
