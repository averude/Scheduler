import * as ExcelJS from 'exceljs'
import { Buffer } from 'exceljs'
import { ReportRowData } from "./model/report-row-data";
import { SummationColumn } from "../../../model/summation-column";
import { ReportCreator } from "./creator/report-creator";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportDecorator } from "./decorator/report-decorator";
import { DecorationData } from "./model/decoration-data";
import { Injectable } from "@angular/core";

@Injectable()
export class ReportGenerator {

  private reportCreator: ReportCreator = new ReportCreator();
  private reportDecorator: ReportDecorator = new ReportDecorator();

  constructor() {}

  public generate(daysInMonth: CalendarDay[],
                  data: ReportRowData[],
                  summationColumns: SummationColumn[],
                  decorationData: DecorationData): Promise<Buffer> {
    if (!data || data.length == 0) {
      return Promise.reject('Empty data');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Schedule');

    const row_start_num = 12;
    const col_start_num = 2;
    const header_height = 2;
    const creator_row_start = row_start_num + header_height + data.length + 4;

    this.reportCreator
      .styleColumns(sheet, col_start_num, daysInMonth.length, summationColumns.length);
    this.reportCreator
      .createHeader(sheet, data, summationColumns, col_start_num, row_start_num, header_height, daysInMonth);
    this.reportCreator
      .createDataSection(sheet, data, daysInMonth, col_start_num, row_start_num + header_height + 1);

    this.reportDecorator.decorateTop(sheet, decorationData, daysInMonth.length);
    this.reportDecorator.decorateBottom(sheet, decorationData, creator_row_start);

    return workbook.xlsx.writeBuffer();
  }
}
