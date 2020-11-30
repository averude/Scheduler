import { Worksheet } from "exceljs";
import { ReportData } from "../model/report-row-data";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         reportData: ReportData);
}
