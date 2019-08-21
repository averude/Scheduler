import { Authority } from "./authority";

export class UserAccount {
  id:           number;
  username:     string;
  departmentId: number;
  shiftId:      number;
  employeeId:   number;
  locked:       boolean;
  enabled:      boolean;
  authorities:  Authority[];
}
