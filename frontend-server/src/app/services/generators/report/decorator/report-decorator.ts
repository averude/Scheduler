import { Worksheet } from "exceljs";
import { DecorationData } from "../model/decoration-data";
import { ReportMarkup } from "../model/report-markup";
import { ReportRowData } from "../model/report-row-data";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";

export interface ReportDecorator {
  REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           data: ReportRowData[],
           calendarDates: CalendarDay[],
           decorationData: DecorationData,
           reportMarkup: ReportMarkup);
}
