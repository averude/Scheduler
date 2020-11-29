import { Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { DecorationData, HeaderSectionData } from "../model/decoration-data";
import { ReportMarkup } from "../model/report-markup";
import { ReportDecorator } from "./report-decorator";
import {
  arialCyrBoldSize16,
  arialCyrSize12,
  arialCyrSize14,
  bottomThinBorders,
  centerAlign,
  leftAlign,
  rightAlign
} from "../styles/report-styles";

export abstract class AReportDecorator implements ReportDecorator {
  abstract REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           reportMarkup: ReportMarkup,
           data: ReportRowData[],
           calendarDates: CalendarDay[],
           decorationData: DecorationData) {
    const creator_row_start = reportMarkup.row_start_num + reportMarkup.header_height
      + (data.length * reportMarkup.row_step) + reportMarkup.table_creator_interval;
    const days_in_month = calendarDates.length;

    this.decorateTop(sheet, reportMarkup, decorationData, days_in_month);
    this.decorateBottom(sheet, reportMarkup, decorationData, creator_row_start);
  }

  abstract decorateTop(sheet: Worksheet,
                       reportMarkup: ReportMarkup,
                       decorationData: DecorationData,
                       daysInMonth: number): void;

  abstract decorateBottom(sheet: Worksheet,
                          reportMarkup: ReportMarkup,
                          decorationData: DecorationData,
                          start_row_num: number): void;

  decorateHeaderSection(sheet,
                        sectionData: HeaderSectionData,
                        start_row_num,
                        start_col_num,
                        col_interval: number) {
    if (sectionData) {
      const labelCell = sheet.getRow(start_row_num).getCell(start_col_num);
      labelCell.value = sectionData.label;
      labelCell.style.font = arialCyrSize12;

      const positionCell = sheet.getRow(start_row_num + 1).getCell(start_col_num);
      positionCell.value = sectionData.position;
      positionCell.style.font = arialCyrSize12;

      const personCell = sheet.getRow(start_row_num + 3).getCell(start_col_num + col_interval);
      personCell.value = sectionData.person;
      personCell.style.font = arialCyrSize12;

      let row = sheet.getRow(start_row_num + 5);
      for (let i = start_col_num; i < start_col_num + col_interval; i++) {
        row.getCell(i).style.border = bottomThinBorders;
      }

      const yearCell = sheet.getRow(start_row_num + 5).getCell(start_col_num + col_interval);
      yearCell.value = sectionData.year;
      yearCell.style.font = arialCyrSize12;
      yearCell.style.alignment = leftAlign;
    }
  }

  decorateTableLabelSection(sheet,
                            decorationData,
                            label,
                            start_row_num,
                            start_col_num,
                            daysInMonth) {
    const sched_label_col_num = Math.round(daysInMonth / 2) + start_col_num;
    const sched_and_serv_row_num = start_row_num + 2;
    const merged_cells_num = 16 - (31 - daysInMonth);
    const merge_start_col_num = start_col_num + 2;
    const merge_end_col_num = merge_start_col_num + merged_cells_num;

    const scheduleLabelCell = sheet.getRow(start_row_num).getCell(sched_label_col_num);
    scheduleLabelCell.value = label;
    scheduleLabelCell.style.font = arialCyrBoldSize16;

    sheet.mergeCells(sched_and_serv_row_num, merge_start_col_num, sched_and_serv_row_num, merge_end_col_num);
    const scheduleAndServiceNameCell = sheet.getCell(sched_and_serv_row_num, merge_start_col_num);
    scheduleAndServiceNameCell.value = decorationData.schedAndServiceName;
    scheduleAndServiceNameCell.style.font = arialCyrSize14;
    scheduleAndServiceNameCell.style.alignment = rightAlign;

    const miscCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 1);
    miscCell.value = 'на';
    miscCell.style.alignment = centerAlign;
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
  }
}
