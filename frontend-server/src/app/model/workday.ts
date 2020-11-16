import { IdEntity } from "./interface/id-entity";
import { HasTime } from "./interface/has-time";

export class WorkDay implements IdEntity, HasTime {
  id:                 number;
  employeeId:         number;
  scheduledDayTypeId: number;
  actualDayTypeId:    number;
  startTime:          number;
  breakStartTime:     number;
  breakEndTime:       number;
  endTime:            number;
  date:               string;
}
