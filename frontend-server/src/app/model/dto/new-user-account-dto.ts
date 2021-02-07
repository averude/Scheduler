import { IdEntity } from "../interface/id-entity";

export class UserAccountDTO implements IdEntity {
  id:           number;
  username:     string;
  name:         string;
  role:         UserAccountRole;
  authority:    UserAccountAuthority;
  enterpriseId: number;
  departmentId: number;
  shiftIds:     number[];
}

export class NewUserAccountDTO extends UserAccountDTO {
  password:     string;
}

export class PasswordChangeDTO {
  oldPassword:      string;
  newPassword:      string;
  confirmPassword:  string;
}

export enum UserAccountRole {
  ADMIN = 'ADMIN',
  USER  = 'USER'
}

export enum UserAccountAuthority {
  GLOBAL_ADMIN      = 'GLOBAL_ADMIN',
  ENTERPRISE_ADMIN  = 'ENTERPRISE_ADMIN',
  DEPARTMENT_ADMIN  = 'DEPARTMENT_ADMIN',
  SHIFT_ADMIN       = 'SHIFT_ADMIN'
}
