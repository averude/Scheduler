export class UserAccount {
  id:           number;
  username:     string;
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
