import { Shift } from "../../../model/shift";
import { WorkingNorm } from "../../../model/working-norm";
import { Moment } from "moment";
import { BasicDTO } from "../../../model/dto/basic-dto";
import { ShiftPattern } from "../../../model/shift-pattern";

export class WorkingNormInitialData {
  shifts:           Shift[];
  from:             Moment;
  to:               Moment;
  workingNormDTOs:  BasicDTO<Shift, WorkingNorm>[];
  shiftPatterns:    ShiftPattern[];
}
