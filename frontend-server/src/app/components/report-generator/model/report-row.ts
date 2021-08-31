import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { ReportCellValue } from "./report-cell-value";
import { ReportMarkup } from "./report-markup";
import { DecorationData } from "./decoration-data";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";

export class ReportData {
  reportMarkup:   ReportMarkup;
  tableData:      TableData;
  decorationData: DecorationData;
}

export class ReportRow extends Row {
  parent:   RowGroup;
  id:       number;
  name:     string;
  position: string;
  cells:    Cell[];
  reportCellData?: ReportCellValue[];
}

export class ReportRowValue {
  name:     string;
  position: string;
}
