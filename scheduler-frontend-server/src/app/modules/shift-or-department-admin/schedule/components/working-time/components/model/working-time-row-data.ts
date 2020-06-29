import { RowData } from "../../../../../../../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../../../../../../../lib/ngx-schedule-table/model/data/cell-data";

export class WorkingTimeRowData implements RowData {
  id: number;
  shiftName: string;
  patternName: string;
  cellData: CellData[];
}
