import { Cell, Row, Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { SummationColumn } from "../../../../model/summation-column";
import {
  arialCyrSize10,
  centerAlignVertRotation,
  centerMiddleAlign,
  dottedBorders,
  holidayFill,
  leftRightBottomMediumBorders,
  leftRightMediumBorders,
  leftRightMediumTopBottomThinBorders,
  leftRightThinBottomMediumBorders,
  mediumBorders,
  scheduleDataFont,
  topLeftRightMediumBorders,
  topMediumBorders,
  topMediumLeftRightThinBorders,
  weekendFill
} from "../styles/report-styles";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";

export class ReportCreator {

  public styleColumns(sheet: Worksheet,
                      colStartNum: number,
                      daysInMonth: number,
                      summationColumnsCount: number) {
    let col_idx = colStartNum;
    let idCol = sheet.getColumn(col_idx++);
    idCol.key = 'id';
    idCol.width = 3;

    let nameCol = sheet.getColumn(col_idx++);
    nameCol.key = 'name';
    nameCol.width = 20;

    let positionCol = sheet.getColumn(col_idx++);
    positionCol.key = 'position';
    positionCol.width = 8;

    for (let day_idx = 1; day_idx <= daysInMonth; col_idx++, day_idx++) {
      let col = sheet.getColumn(col_idx);
      col.key = `day_${day_idx}`;
      col.width = 5;
    }

    for (let sum_col_idx = 0; sum_col_idx < summationColumnsCount; sum_col_idx++, col_idx++) {
      let col = sheet.getColumn(col_idx);
      col.key = `sum_col_${col_idx}`;
    }
  }

  public createHeader(sheet: Worksheet,
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

    rows[1].height = 35;

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

    const posCellIdx = col_idx++;
    const posCell = rows[1].getCell(posCellIdx);
    posCell.value = 'Посада';
    posCell.style.font = arialCyrSize10;
    rows[0].getCell(posCellIdx).style.border = topLeftRightMediumBorders;
    posCell.style.border = leftRightMediumBorders;
    rows[2].getCell(posCellIdx).style.border = leftRightBottomMediumBorders;
    posCell.style.alignment = centerAlignVertRotation;

    let monthDateCaption = rows[0].getCell(col_idx);
    monthDateCaption.value = 'Числа місяця';
    monthDateCaption.style.font = arialCyrSize10;

    for (let day_idx = 0; day_idx < calendarDays.length; day_idx++, col_idx++) {
      const dateCell = rows[2].getCell(col_idx);
      const calendarDay = calendarDays[day_idx];
      dateCell.value = day_idx + 1;
      dateCell.style.font = arialCyrSize10;
      dateCell.style.border = leftRightThinBottomMediumBorders;
      rows[0].getCell(col_idx).style.border = topMediumBorders;
      const colorLabelCell = rows[1].getCell(col_idx);
      colorLabelCell.style.border = topMediumLeftRightThinBorders;
      this.setFill(calendarDay, colorLabelCell);
    }

    for (let sum_col_idx = 0; sum_col_idx < summationColumns.length; sum_col_idx++, col_idx++) {
      sheet.mergeCells(rowStartNum, col_idx, rowStartNum + headerHeight, col_idx);
      const summationColumn = summationColumns[sum_col_idx];
      const sumColCell = rows[0].getCell(col_idx);
      sumColCell.value = summationColumn.name;
      sumColCell.style.font = arialCyrSize10;
      sumColCell.style.border = mediumBorders;
      sumColCell.style.alignment = centerAlignVertRotation;
    }

    rows.forEach(row => row.commit());
  }

  public createDataSection(sheet: Worksheet,
                           data: ReportRowData[],
                           calendarDays: CalendarDay[],
                           colStartNum: number,
                           rowStartNum: number) {
    let row_idx = rowStartNum;
    for (let row_data_idx = 0; row_data_idx <= data.length; row_idx++, row_data_idx++) {
      const row = sheet.getRow(row_idx);

      if (row_data_idx == data.length) {
        let firstReportRow = data[data.length - 1];
        let table_cols_num = colStartNum + 3 + firstReportRow.cellData.length + firstReportRow.summationResults.length;
        for (let idx = colStartNum; idx < table_cols_num; idx++) {
          row.getCell(idx).style.border = topMediumBorders;
        }
        break;
      }

      const rowData = data[row_data_idx];

      let col_idx = colStartNum;
      const idCell = row.getCell(col_idx++);
      idCell.value = row_data_idx + 1;
      idCell.style.font = scheduleDataFont;
      idCell.style.border = leftRightMediumTopBottomThinBorders;

      const nameCell = row.getCell(col_idx++);
      nameCell.value = rowData.name;
      nameCell.style.font = scheduleDataFont;
      nameCell.style.border = leftRightMediumTopBottomThinBorders;

      const positionCell = row.getCell(col_idx++);
      positionCell.value = rowData.position;
      positionCell.style.font = scheduleDataFont;
      positionCell.style.border = leftRightMediumTopBottomThinBorders;

      const cellData = rowData.cellData;
      for (let cell_data_idx = 0; cell_data_idx < cellData.length; cell_data_idx++, col_idx++) {
        const workDayCell = row.getCell(col_idx);
        const calendarDay = calendarDays[cell_data_idx];
        workDayCell.value = cellData[cell_data_idx].value;
        workDayCell.numFmt = '0.00';
        workDayCell.style.font = scheduleDataFont;
        workDayCell.style.alignment = centerMiddleAlign;
        workDayCell.style.border = dottedBorders;
        this.setFill(calendarDay, workDayCell);
      }

      const summationResults = rowData.summationResults;
      for (let sum_res_idx = 0; sum_res_idx < summationResults.length; sum_res_idx++, col_idx++) {
        const sumResCell = row.getCell(col_idx);
        sumResCell.value = summationResults[sum_res_idx].value;
        sumResCell.style.font = scheduleDataFont;
        sumResCell.style.alignment = centerMiddleAlign;
        sumResCell.style.border = leftRightMediumTopBottomThinBorders;
      }

      row.commit();
    }
  }

  private setFill(date: CalendarDay, cell: Cell) {
    if (date.weekend) {
      cell.style.fill = weekendFill;
    } else if (date.holiday) {
      cell.style.fill = holidayFill;
    }
  }
}
