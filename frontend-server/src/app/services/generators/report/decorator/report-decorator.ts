import { Worksheet } from "exceljs";
import { DecorationData } from "../model/decoration-data";
import { ReportMarkup } from "../model/report-markup";
import { ReportRowData } from "../model/report-row-data";

export interface ReportDecorator {
  REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           reportMarkup: ReportMarkup,
           data: ReportRowData[],
           decorationData: DecorationData);
}
