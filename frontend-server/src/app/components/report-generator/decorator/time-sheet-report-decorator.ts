import { AReportDecorator } from "./a-report-decorator";
import { TIME_SHEET_REPORT } from "../model/report-types";

export class TimeSheetReportDecorator extends AReportDecorator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;
}
