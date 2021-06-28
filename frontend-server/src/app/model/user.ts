export class UserSession {
  access_token?: string;
  roles: string[];
  expired: number;
  accessRights: UserAccessRights;
}

export class UserAccessRights {
  isAdmin:            boolean = false;
  isEnterpriseLevel:  boolean = false;
  isDepartmentLevel:  boolean = false;
  isShiftLevel:       boolean = false;
}
