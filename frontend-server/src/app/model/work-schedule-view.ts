import { HasDepartmentId } from "./interface/has-department-id";
import { IdEntity } from "./interface/id-entity";
import { HasEnterpriseId } from "./interface/has-enterprise-id";

export class WorkScheduleView implements IdEntity, HasEnterpriseId, HasDepartmentId {
  id:                 number;
  enterpriseId:       number;
  departmentId:       number;
  targetDepartmentId: number;
  name:               string;
}
