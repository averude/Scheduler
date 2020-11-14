import { Moment } from "moment";
import { Shift } from "../shift";

export interface ShiftGenerationUnit {
  shift:  Shift;
  offset: number;
  from:   Moment;
  to:     Moment;
}
