import { RowData } from "../../../../../../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../../../../../../lib/ngx-schedule-table/model/data/cell-data";

export class SchedulerRowData implements RowData {
  id:       number;
  name:     string;
  position: string;
  cellData: CellData[];
  sum?:     number;
  timeNorm: number;
  diff?:    number;
  isSubstitution: boolean;
}
