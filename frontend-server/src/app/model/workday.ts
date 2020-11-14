import { IdEntity } from "./interface/id-entity";
import { HasDayTypeIdAndTime } from "./interface/has-day-type-id-and-time";

export class WorkDay implements IdEntity, HasDayTypeIdAndTime {
  id:                 number;
  employeeId:         number;
  scheduledDayTypeId: number;
  actualDayTypeId:    number;
  startTime:          number;
  breakStartTime:     number;
  breakEndTime:       number;
  endTime:            number;
  date:               string;

  get dayTypeId() {
    console.log("ERROR");
    return null;
  }
}
