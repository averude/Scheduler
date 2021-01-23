import { IdEntity } from "../interface/id-entity";

export class UserAccount implements IdEntity{
  id:           number;
  username:     string;
  name:         string;
  role:         string;
  authority:    string;
  enterpriseId: number;
  departmentId: number;
  locked:       boolean;
  enabled:      boolean;
}
