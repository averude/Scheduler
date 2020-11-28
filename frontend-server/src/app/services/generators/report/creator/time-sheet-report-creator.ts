import { ReportCreator } from "./report-creator";
import { Row, Worksheet } from "exceljs";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportRowData } from "../model/report-row-data";
import {
  arialCyrSize10,
  arialCyrSize8,
  bottomMediumLeftRightDottedBorders,
  centerAlignVertRotation,
  centerMiddleAlign,
  mediumBorders,
  topMediumLeftRightDottedBorders
} from "../styles/report-styles";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { ReportMarkup } from "../model/report-markup";

export class TimeSheetReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  styleColumns(sheet: Worksheet,
               daysInMonth: number,
               summationColumnsCount: number,
               reportMarkup: ReportMarkup): void {
    let col_idx = reportMarkup.col_start_num;
    let idCol = sheet.getColumn(col_idx++);
    idCol.key = 'id';
    idCol.width = 3;

    let nameCol = sheet.getColumn(col_idx++);
    nameCol.key = 'name';
    nameCol.width = 20;

    for (let day_idx = 1; day_idx <= daysInMonth; col_idx++, day_idx++) {
      let col = sheet.getColumn(col_idx);
      col.key = `day_${day_idx}`;
      col.width = 6;
    }

    for (let sum_col_idx = 0; sum_col_idx < summationColumnsCount; sum_col_idx++, col_idx++) {
      let col = sheet.getColumn(col_idx);
      col.key = `sum_col_${col_idx}`;
    }
  }

  createHeader(sheet: Worksheet,
               data: ReportRowData[],
               summationColumns: SummationColumn[],
               calendarDays: CalendarDay[],
               reportMarkup: ReportMarkup) {
    const last_header_row_num = reportMarkup.row_start_num + reportMarkup.header_height;
    let col_idx = reportMarkup.col_start_num;

    const rows: Row[] = [];
    for (let i = reportMarkup.row_start_num; i <= last_header_row_num; i++) {
      rows.push(sheet.getRow(i));
    }

    rows[0].height = 32;

    sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_num, col_idx);
    const idCell = rows[0].getCell(col_idx++);
    idCell.value = '№';
    idCell.style.font = arialCyrSize10;
    idCell.style.border = mediumBorders;
    idCell.style.alignment = centerMiddleAlign;

    sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_num, col_idx);
    const nameCell = rows[0].getCell(col_idx++);
    nameCell.value = 'П.І.Б.';
    nameCell.style.font = arialCyrSize10;
    nameCell.style.border = mediumBorders;
    nameCell.style.alignment = centerMiddleAlign;

    for (let day_idx = 0; day_idx < calendarDays.length; day_idx++, col_idx++) {
      const dateCell = rows[1].getCell(col_idx);
      const calendarDay = calendarDays[day_idx];
      dateCell.value = day_idx + 1;
      dateCell.style.alignment = centerMiddleAlign;
      dateCell.style.font = arialCyrSize10;
      dateCell.style.border = bottomMediumLeftRightDottedBorders;
      rows[0].getCell(col_idx).style.border = topMediumLeftRightDottedBorders;
    }

    for (let sum_col_idx = 0; sum_col_idx < summationColumns.length; sum_col_idx++, col_idx++) {
      sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_num, col_idx);
      const summationColumn = summationColumns[sum_col_idx];
      const sumColCell = rows[0].getCell(col_idx);
      sumColCell.value = summationColumn.name;
      sumColCell.style.font = arialCyrSize8;
      sumColCell.style.border = mediumBorders;
      sumColCell.style.alignment = centerAlignVertRotation;
    }

    rows.forEach(row => row.commit());
  }
}
