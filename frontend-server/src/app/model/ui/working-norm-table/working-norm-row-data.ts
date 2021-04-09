import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";

export class WorkingNormRow implements Row {
  id:           number;
  shiftName:    string;
  patternName:  string;
  cells:        Cell[];
}
