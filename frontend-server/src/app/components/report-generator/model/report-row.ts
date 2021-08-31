import { ReportMarkup } from "./report-markup";
import { DecorationData } from "./decoration-data";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";

export class ReportData {
  reportMarkup:   ReportMarkup;
  tableData:      TableData;
  decorationData: DecorationData;
}
