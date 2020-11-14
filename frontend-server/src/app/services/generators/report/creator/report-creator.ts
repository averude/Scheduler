import { Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { SummationColumn } from "../../../../model/summation-column";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportMarkup } from "../model/report-markup";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         data: ReportRowData[],
         calendarDays: CalendarDay[],
         summationColumns: SummationColumn[],
         reportMarkup: ReportMarkup);
}
