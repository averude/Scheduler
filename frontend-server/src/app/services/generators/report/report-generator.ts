import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportRowData } from "./model/report-row-data";
import { SummationColumn } from "../../../model/summation-column";
import { DecorationData } from "./model/decoration-data";
import * as ExcelJS from "exceljs";
import { Buffer } from "exceljs";
import { ReportMarkup } from "./model/report-markup";
import { ReportCreator } from "./creator/report-creator";
import { ReportDecorator } from "./decorator/report-decorator";
import { Injectable } from "@angular/core";

@Injectable()
export class ReportGenerator {

  generate(reportCreator: ReportCreator,
           reportDecorator: ReportDecorator,
           data: ReportRowData[],
           calendarDays: CalendarDay[],
           summationColumns: SummationColumn[],
           decorationData: DecorationData,
           reportMarkup: ReportMarkup): Promise<Buffer> {
    if (!data || data.length == 0) {
      return Promise.reject('Empty data');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Schedule');

    reportCreator.create(sheet, data, calendarDays, summationColumns, reportMarkup);
    reportDecorator.decorate(sheet, data, decorationData, reportMarkup);

    return workbook.xlsx.writeBuffer();
  }
}
