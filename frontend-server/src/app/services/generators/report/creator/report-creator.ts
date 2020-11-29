import { Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { ReportMarkup } from "../model/report-markup";
import { ReportHeaderCell } from "../model/report-cell-data";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         headerCells: ReportHeaderCell[],
         data: ReportRowData[],
         reportMarkup: ReportMarkup);
}
