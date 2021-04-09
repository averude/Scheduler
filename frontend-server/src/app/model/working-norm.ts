import { IdEntity } from "./interface/id-entity";
import { HasDate } from "./interface/has-date";
import { HasDepartmentId } from "./interface/has-department-id";

export class WorkingNorm implements IdEntity, HasDate, HasDepartmentId {
  id:           number;
  departmentId: number;
  shiftId:      number;
  date:         Date;
  hours:        number;
  days:         number;
}
