import { Worksheet } from "exceljs";
import { ReportData } from "../model/report-row-data";

export interface ReportDecorator {
  REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           reportData: ReportData);
}
