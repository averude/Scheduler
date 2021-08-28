import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { ReportCellData, ReportHeaderCell } from "./report-cell-data";
import { ReportMarkup } from "./report-markup";
import { DecorationData } from "./decoration-data";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";

export class ReportData {
  reportMarkup:   ReportMarkup;
  headerData:     ReportHeaderCell[];
  tableData:      TableData;
  decorationData: DecorationData;
}

export class ReportGroup extends RowGroup {
  id:   number;
  rows: ReportRow[];
}

export class ReportRow extends Row {
  parent:   RowGroup;
  id:       number;
  name:     string;
  position: string;
  cells:    Cell[];
  reportCellData?: ReportCellData[];
}
