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

export class TimeSheetReportCreator extends AReportCreator implements ReportCreator {
  ROW_STEP: number = 2;
  COLS_BEFORE_DATA: number = 2;
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  styleColumns(sheet: Worksheet,
               colStartNum: number,
               daysInMonth: number,
               summationColumnsCount: number): void {
    let col_idx = colStartNum;
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
               colStartNum: number,
               rowStartNum: number,
               headerHeight: number,
               calendarDays: CalendarDay[]) {
    let col_idx = colStartNum;

    const rows: Row[] = [];
    for (let i = rowStartNum; i <= rowStartNum + headerHeight; i++) {
      rows.push(sheet.getRow(i));
    }

    rows[0].height = 32;

    sheet.mergeCells(rowStartNum, col_idx, rowStartNum + headerHeight, col_idx);
    const idCell = rows[0].getCell(col_idx++);
    idCell.value = '№';
    idCell.style.font = arialCyrSize10;
    idCell.style.border = mediumBorders;
    idCell.style.alignment = centerMiddleAlign;

    sheet.mergeCells(rowStartNum, col_idx, rowStartNum + headerHeight, col_idx);
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
      sheet.mergeCells(rowStartNum, col_idx, rowStartNum + headerHeight, col_idx);
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
