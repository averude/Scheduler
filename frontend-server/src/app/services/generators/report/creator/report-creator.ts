import { Worksheet } from "exceljs";
import { ReportData, ReportRowData } from "../model/report-row-data";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         reportData: ReportData,
         reportRowData: ReportRowData[]);
}
