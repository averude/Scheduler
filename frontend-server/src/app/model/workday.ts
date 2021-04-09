import { IdEntity } from "./interface/id-entity";
import { HasTime } from "./interface/has-time";
import { HasDate } from "./interface/has-date";
import { HasDepartmentId } from "./interface/has-department-id";

export class WorkDay implements IdEntity, HasTime, HasDate, HasDepartmentId {
  id:                 number;
  departmentId:       number;
  employeeId:         number;
  scheduledDayTypeId: number;
  actualDayTypeId:    number;
  startTime:          number;
  breakStartTime:     number;
  breakEndTime:       number;
  endTime:            number;
  date:               string;
}
