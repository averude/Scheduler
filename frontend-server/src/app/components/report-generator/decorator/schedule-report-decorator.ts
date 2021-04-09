import { AReportDecorator } from "./a-report-decorator";
import { SCHEDULE_REPORT } from "../model/report-types";

export class ScheduleReportDecorator extends AReportDecorator {
  REPORT_TYPE: string = SCHEDULE_REPORT;
}
