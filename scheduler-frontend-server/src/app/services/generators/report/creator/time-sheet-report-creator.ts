import { ReportCreator } from "./report-creator";
import { Row, Worksheet } from "exceljs";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportRowData } from "../model/report-row-data";
import {
  arialCyrBoldSize10,
  arialCyrSize10,
  arialCyrSize8,
  bottomMediumLeftRightDottedBorders,
  centerAlignVertRotation,
  centerMiddleAlign,
  dottedBorders,
  leftRightMediumTopBottomDottedBorders,
  leftRightMediumTopDottedBottomThinBorders,
  leftRightTopDottedBottomThinBorders,
  mediumBorders,
  rightAlign,
  scheduleDataFont,
  topMediumBorders,
  topMediumLeftRightDottedBorders
} from "../styles/report-styles";
import { ReportMarkup } from "../model/report-markup";
import { TIME_SHEET_REPORT } from "../model/report-types";

export class TimeSheetReportCreator implements ReportCreator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  create(sheet: Worksheet,
         data: ReportRowData[],
         calendarDays: CalendarDay[],
         summationColumns: SummationColumn[],
         reportMarkup: ReportMarkup) {
    this.styleColumns(sheet, reportMarkup.col_start_num, calendarDays.length, summationColumns.length);
    this.createHeader(sheet, data, summationColumns,
        reportMarkup.col_start_num, reportMarkup.row_start_num, reportMarkup.header_height, calendarDays);
    this.createDataSection(sheet, data, calendarDays, reportMarkup.col_start_num,
        reportMarkup.row_start_num + reportMarkup.header_height + 1);
  }

  private createHeader(sheet: Worksheet,
               data: ReportRowData[],
               summationColumns: SummationColumn[],
               colStartNum: number,
               rowStartNum: number,
               headerHeight: number,
               calendarDays: CalendarDay[]): void {
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

  private createDataSection(sheet: Worksheet,
                    data: ReportRowData[],
                    calendarDays: CalendarDay[],
                    colStartNum: number,
                    rowStartNum: number): void {
    const row_step = 2;
    let row_idx = rowStartNum;
    for (let row_data_idx = 0; row_data_idx <= data.length; row_idx+=row_step, row_data_idx++) {
      const rows = [sheet.getRow(row_idx), sheet.getRow(row_idx + 1)];

      if (row_data_idx == data.length) {
        let firstReportRow = data[data.length - 1];
        let table_cols_num = colStartNum + 2 + firstReportRow.cellData.length + firstReportRow.summationResults.length;
        for (let idx = colStartNum; idx < table_cols_num; idx++) {
          rows[0].getCell(idx).style.border = topMediumBorders;
        }
        break;
      }

      const rowData = data[row_data_idx];

      let col_idx = colStartNum;
      const idCell = rows[0].getCell(col_idx);
      idCell.value = row_data_idx + 1;
      idCell.style.font = scheduleDataFont;
      idCell.style.border = leftRightMediumTopBottomDottedBorders;

      const idCell2 = rows[1].getCell(col_idx++);
      idCell2.style.font = scheduleDataFont;
      idCell2.style.border = leftRightMediumTopDottedBottomThinBorders;

      const nameCell = rows[0].getCell(col_idx);
      nameCell.value = rowData.name;
      nameCell.style.font = arialCyrBoldSize10;
      nameCell.style.border = leftRightMediumTopBottomDottedBorders;

      const positionCell = rows[1].getCell(col_idx++);
      positionCell.value = rowData.position;
      positionCell.style.font = scheduleDataFont;
      positionCell.style.border = leftRightMediumTopDottedBottomThinBorders;
      positionCell.style.alignment = rightAlign;

      const cellData = rowData.cellData;
      for (let cell_data_idx = 0; cell_data_idx < cellData.length; cell_data_idx++, col_idx++) {
        const actWorkDayCell = rows[0].getCell(col_idx);
        actWorkDayCell.value = cellData[cell_data_idx].value[0];
        actWorkDayCell.numFmt = '0.00';
        actWorkDayCell.style.font = arialCyrSize10;
        actWorkDayCell.style.alignment = centerMiddleAlign;
        actWorkDayCell.style.border = dottedBorders;

        const schdWorkDayCell = rows[1].getCell(col_idx);
        schdWorkDayCell.value = cellData[cell_data_idx].value[1];
        schdWorkDayCell.numFmt = '0.00';
        schdWorkDayCell.style.font = arialCyrSize10;
        schdWorkDayCell.style.alignment = centerMiddleAlign;
        schdWorkDayCell.style.border = leftRightTopDottedBottomThinBorders;
      }

      const summationResults = rowData.summationResults;
      for (let sum_res_idx = 0; sum_res_idx < summationResults.length; sum_res_idx++, col_idx++) {
        for (let row_h_idx = 0; row_h_idx < rows.length; row_h_idx++) {
          const sumResCell = rows[row_h_idx].getCell(col_idx);
          sumResCell.value = summationResults[sum_res_idx].value;
          sumResCell.style.font = scheduleDataFont;
          sumResCell.style.alignment = centerMiddleAlign;
          if (row_h_idx == 1) {
            sumResCell.style.border = leftRightMediumTopDottedBottomThinBorders;
          } else {
            sumResCell.style.border = leftRightMediumTopBottomDottedBorders;
          }
        }
      }

      rows.filter(row => row.commit());
    }
  }

  private styleColumns(sheet: Worksheet,
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
}
