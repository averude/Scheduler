import { Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { DecorationData } from "../model/decoration-data";
import { ReportMarkup } from "../model/report-markup";
import { ReportDecorator } from "./report-decorator";

export abstract class AReportDecorator implements ReportDecorator {
  abstract REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           data: ReportRowData[],
           calendarDates: CalendarDay[],
           decorationData: DecorationData,
           reportMarkup: ReportMarkup) {
    const creator_row_start = reportMarkup.row_start_num + reportMarkup.header_height
      + (data.length * reportMarkup.row_step) + reportMarkup.table_creator_interval;
    const days_in_month = calendarDates.length;

    this.decorateTop(sheet, decorationData, days_in_month);
    this.decorateBottom(sheet, decorationData, creator_row_start);
  }

  abstract decorateTop(sheet: Worksheet,
                       decorationData: DecorationData,
                       daysInMonth: number): void;

  abstract decorateBottom(sheet: Worksheet,
                          decorationData: DecorationData,
                          start_row_num: number): void;
}
