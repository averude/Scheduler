import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";
import { HasDepartmentId } from "./interface/has-department-id";
import { HasUIPriority } from "./interface/has-ui-priority";

export class Position implements IdEntity, HasName, HasDepartmentId, HasUIPriority {
  id:           number;
  departmentId: number;
  name:         string;
  shortName:    string;
  uiPriority:   number;
}
