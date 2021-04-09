import { Worksheet } from "exceljs";
import { ReportData, ReportRow } from "../model/report-row";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         reportData: ReportData,
         reportRowData: ReportRow[]);
}
