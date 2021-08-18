import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Shift } from "../../shift";

export class WorkingNormRow extends Row {
  value:        Shift;
  patternName:  string;
}
