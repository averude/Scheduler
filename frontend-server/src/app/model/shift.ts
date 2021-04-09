import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";
import { HasDepartmentId } from "./interface/has-department-id";

export class Shift implements IdEntity, HasName, HasDepartmentId {
  id:             number;
  departmentId:   number;
  name:           string;
  shiftPatternId: number;
}
