import { RowData } from "../../../../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { SummationResult } from "../../../../model/dto/summation-dto";

export class ReportRowData implements RowData{
  id: number;
  name: string;
  position: string;
  cellData: CellData[];
  norm: number;
  summationResults: SummationResult[];
}
