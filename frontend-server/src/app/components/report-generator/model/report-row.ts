import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { ReportCellData, ReportHeaderCell } from "./report-cell-data";
import { ReportMarkup } from "./report-markup";
import { DecorationData } from "./decoration-data";

export class ReportData {
  reportMarkup:   ReportMarkup;
  headerData:     ReportHeaderCell[];
  tableData:      ReportGroup[];
  decorationData: DecorationData;
}

export class ReportGroup {
  id:   number;
  name: string;
  rows: ReportRow[];
}

export class ReportRow implements Row {
  id:       number;
  name:     string;
  position: string;
  cells:    Cell[];
  reportCellData?: ReportCellData[];
}
