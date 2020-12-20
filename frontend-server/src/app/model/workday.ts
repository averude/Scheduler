import { IdEntity } from "./interface/id-entity";
import { HasTime } from "./interface/has-time";
import { HasDate } from "./interface/has-date";

export class WorkDay implements IdEntity, HasTime, HasDate {
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
