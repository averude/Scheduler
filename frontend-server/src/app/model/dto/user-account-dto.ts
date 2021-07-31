import { IdEntity } from "../interface/id-entity";

export class UserAccountDTO implements IdEntity {
  id:             number;
  username:       string;
  name:           string;
  role:           UserAccountRole;
  authority:      UserAccountLevel;
  enterpriseId:   number;
  departmentIds:  number[];
  shiftIds:       number[];
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

export enum UserAccountLevel {
  GLOBAL      = 'GLOBAL',
  ENTERPRISE  = 'ENTERPRISE',
  DEPARTMENT  = 'DEPARTMENT',
  SHIFT       = 'SHIFT'
}
