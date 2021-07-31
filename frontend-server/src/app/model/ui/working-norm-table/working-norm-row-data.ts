import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Shift } from "../../shift";

export class WorkingNormRow implements Row {
  id:           number;
  value:        Shift;
  patternName:  string;
  cells:        Cell[];
}
