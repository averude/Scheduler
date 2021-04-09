import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";
import { HasEnterpriseId } from "./interface/has-enterprise-id";

export class Department implements IdEntity, HasName, HasEnterpriseId {
  id:           number;
  enterpriseId: number;
  name:         string;
}
