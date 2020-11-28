import { ReportDecorator } from "./report-decorator";
import { Worksheet } from "exceljs";
import { DecorationData } from "../model/decoration-data";
import {
  arialCyrBoldSize16,
  arialCyrSize12,
  arialCyrSize14,
  bottomThinBorders,
  centerAlign,
  leftAlign,
  rightAlign
} from "../styles/report-styles";
import { ReportMarkup } from "../model/report-markup";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { ReportRowData } from "../model/report-row-data";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";

export class TimeSheetReportDecorator implements ReportDecorator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  decorate(sheet: Worksheet,
           data: ReportRowData[],
           calendarDates: CalendarDay[],
           decorationData: DecorationData,
           reportMarkup: ReportMarkup) {
    const creator_row_start = reportMarkup.row_start_num + reportMarkup.header_height
      + (data.length * 2) + reportMarkup.table_creator_interval;
    const days_in_month = calendarDates.length;

    this.decorateTop(sheet, decorationData, days_in_month);
    this.decorateBottom(sheet, decorationData, creator_row_start);
  }

  decorateBottom(sheet: Worksheet,
                 decorationData: DecorationData,
                 start_row_num: number): void {
    let row_num = start_row_num;
    decorationData.documentCreators.forEach(creator => {
      if (creator.name && creator.position) {
        let col_start_num = 5;

        const position_merge_col_start = col_start_num;
        const position_merge_col_end = col_start_num + 13;
        const underscore_col_start = position_merge_col_end + 1;
        const underscore_col_end = underscore_col_start + 4;

        sheet.mergeCells(row_num, position_merge_col_start, row_num, position_merge_col_end);
        let positionCell = sheet.getCell(row_num, col_start_num);
        positionCell.value = creator.position;
        positionCell.style.font = arialCyrSize12;
        positionCell.style.alignment = rightAlign;

        for (let col_num = underscore_col_start; col_num <= underscore_col_end; col_num++) {
          sheet.getCell(row_num, col_num).style.border = bottomThinBorders;
        }

        let nameCell = sheet.getCell(row_num, underscore_col_end + 1);
        nameCell.value = creator.name;
        nameCell.style.font = arialCyrSize12;

        row_num += 3;
      }
    });
  }

  decorateTop(sheet: Worksheet,
              decorationData: DecorationData,
              daysInMonth: number): void {
    if (!sheet || !decorationData || !daysInMonth || daysInMonth <= 0 || daysInMonth > 31) {
      return;
    }

    const start_row_num = 2;
    const start_col_num = 3;

    const sched_label_row_num = start_row_num;
    const sched_label_col_num = Math.round(daysInMonth / 2) + start_col_num;
    const sched_and_serv_row_num = sched_label_row_num + 2;
    const merged_cells_num = 16 - (31 - daysInMonth);
    const merge_start_col_num = start_col_num + 2;
    const merge_end_col_num = merge_start_col_num + merged_cells_num;

    const scheduleLabelCell = sheet.getRow(sched_label_row_num).getCell(sched_label_col_num);
    scheduleLabelCell.value = 'ТАБЕЛЬ';
    scheduleLabelCell.style.font = arialCyrBoldSize16;

    sheet.mergeCells(sched_and_serv_row_num, merge_start_col_num, sched_and_serv_row_num, merge_end_col_num);
    const scheduleAndServiceNameCell = sheet.getCell(sched_and_serv_row_num, merge_start_col_num);
    scheduleAndServiceNameCell.value = decorationData.schedAndServiceName;
    scheduleAndServiceNameCell.style.font = arialCyrSize14;
    scheduleAndServiceNameCell.style.alignment = rightAlign;

    const miscCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 1);
    miscCell.value = 'на';
    miscCell.style.font = arialCyrSize14;

    sheet.mergeCells(sched_and_serv_row_num, merge_end_col_num + 2, sched_and_serv_row_num, merge_end_col_num + 4);
    const monthCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 2);
    monthCell.value = decorationData.month;
    monthCell.style.font = arialCyrSize14;
    monthCell.style.alignment = centerAlign;

    sheet.mergeCells(sched_and_serv_row_num, merge_end_col_num + 5, sched_and_serv_row_num, merge_end_col_num + 7);
    const yearCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 5);
    yearCell.value = decorationData.year + 'р.';
    yearCell.style.font = arialCyrSize14;
    yearCell.style.alignment = leftAlign;

    sheet.getRow(1).height = 4;
    sheet.getRow(3).height = 4;
    sheet.getRow(5).height = 4;

    sheet.getColumn(1).width = 1;
  }
}
