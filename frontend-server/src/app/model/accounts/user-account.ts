import { IdEntity } from "../interface/id-entity";

export class UserAccount implements IdEntity{
  id:           number;
  username:     string;
  name:         string;
  role:         string;
  locked:       boolean;
  enabled:      boolean;
}

export class ShiftAdminUserAccount extends UserAccount {
  shiftId:      number;
}

export class DepartmentAdminUserAccount extends UserAccount {
  departmentId: number;
}

export class EnterpriseAdminUserAccount extends UserAccount {
  enterpriseId: number;
}
