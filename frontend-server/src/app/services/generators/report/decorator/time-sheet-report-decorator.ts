import { TIME_SHEET_REPORT } from "../model/report-types";
import { AReportDecorator } from "./a-report-decorator";

export class TimeSheetReportDecorator extends AReportDecorator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;
}
