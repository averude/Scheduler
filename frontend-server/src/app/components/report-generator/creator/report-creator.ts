import { Worksheet } from "exceljs";
import { ReportData } from "../model/report-row";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         reportData: ReportData,
         reportRowData: Row[]);
}
