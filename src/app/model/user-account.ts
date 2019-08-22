import { Authority } from "./authority";

export class UserAccount {
  id:           number;
  username:     string;
  firstName:    string;
  secondName:   string;
  departmentId: number;
  shiftId:      number;
  employeeId:   number;
  locked:       boolean;
  enabled:      boolean;
  authorities:  Authority[];
}
