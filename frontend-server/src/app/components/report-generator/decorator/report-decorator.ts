import { Worksheet } from "exceljs";
import { ReportData } from "../model/report-data";
import { ReportSheet } from "../../../model/report-sheet";

export interface ReportDecorator {
  REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           reportData: ReportData,
           dataRowsNum: number,
           reportSheet: ReportSheet);
}
