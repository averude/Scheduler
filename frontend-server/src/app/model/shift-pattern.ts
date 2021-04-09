import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";
import { HasDepartmentId } from "./interface/has-department-id";

export class ShiftPattern implements IdEntity, HasName, HasDepartmentId {
  id:           number;
  departmentId: number;
  name:         string;
}
