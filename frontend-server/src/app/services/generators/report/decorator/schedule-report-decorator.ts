import { SCHEDULE_REPORT } from "../model/report-types";
import { AReportDecorator } from "./a-report-decorator";

export class ScheduleReportDecorator extends AReportDecorator {
  REPORT_TYPE: string = SCHEDULE_REPORT;
}
