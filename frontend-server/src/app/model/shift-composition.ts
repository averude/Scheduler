import { Moment } from "moment";
import { Employee } from "./employee";

export class ShiftComposition {
  id:           number;
  employee:     Employee;
  shiftId:      number;
  substitution: boolean;
  from:         Moment;
  to:           Moment;
}
