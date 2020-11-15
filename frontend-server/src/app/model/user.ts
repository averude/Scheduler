export class User {
  access_token?: string;
  roles: string[];
  accessRights: UserAccessRights;
  // employeeId: number;
  // shiftId: number;
  // departmentId: number;
}

export class UserAccessRights {
  isAdmin:            boolean = false;
  isEnterpriseLevel:  boolean = false;
  isDepartmentLevel:  boolean = false;
  isShiftLevel:       boolean = false;
}
