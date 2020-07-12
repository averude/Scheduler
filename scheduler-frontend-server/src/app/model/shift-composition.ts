import { Moment } from "moment";

export class ShiftComposition {
  id:           number;
  employeeId:   number;
  shiftId:      number;
  substitution: boolean;
  from:         Moment;
  to:           Moment;
}
