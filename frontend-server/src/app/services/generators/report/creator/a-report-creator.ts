import { Row, Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { CellFiller } from "../core/cell-filler";
import { topMediumBorders } from "../styles/report-styles";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportMarkup } from "../model/report-markup";
import { ReportCreator } from "./report-creator";

export abstract class AReportCreator implements ReportCreator {
  abstract ROW_STEP: number;
  abstract COLS_BEFORE_DATA: number;
  abstract REPORT_TYPE: string;

  constructor(protected cellFiller: CellFiller) {
  }

  create(sheet: Worksheet,
         data: ReportRowData[],
         calendarDays: CalendarDay[],
         summationColumns: SummationColumn[],
         reportMarkup: ReportMarkup) {
    this.styleColumns(sheet, reportMarkup.col_start_num,
      calendarDays.length, summationColumns.length);
    this.createHeader(sheet, data, summationColumns, reportMarkup.col_start_num, reportMarkup.row_start_num, reportMarkup.header_height, calendarDays);
    this.createDataSection(sheet, data, calendarDays,
      reportMarkup.col_start_num,
      reportMarkup.row_start_num + reportMarkup.header_height + 1,
      this.ROW_STEP, this.COLS_BEFORE_DATA);
  }

  abstract styleColumns(sheet: Worksheet,
                        colStartNum: number,
                        daysInMonth: number,
                        summationColumnsCount: number);

  abstract createHeader(sheet: Worksheet,
                        data: ReportRowData[],
                        summationColumns: SummationColumn[],
                        colStartNum: number,
                        rowStartNum: number,
                        headerHeight: number,
                        calendarDays: CalendarDay[])

  createDataSection(sheet: Worksheet,
                    data: ReportRowData[],
                    calendarDays: CalendarDay[],
                    colStartNum: number,
                    rowStartNum: number,
                    row_step: number,
                    colsBeforeData: number): void {
    let row_idx = rowStartNum;
    for (let row_data_idx = 0; row_data_idx <= data.length; row_idx+=row_step, row_data_idx++) {
      const rows = this.getRows(row_idx, row_step, sheet);

      if (row_data_idx == data.length) {
        this.underline(rows, data, colStartNum, colsBeforeData);
        break;
      }

      const rowData = data[row_data_idx];
      let col_idx = colStartNum;

      if (rowData && rowData.reportCellData) {
        rowData.reportCellData.forEach(cell =>
          this.cellFiller.fill(rows, col_idx++, cell.value, cell.style));
      }

      rows.forEach(row => row.commit());
    }
  }

  getRows(row_idx: number,
          row_step: number,
          sheet: Worksheet): Row[] {
    const rows = [];
    for (let i = row_idx; i < row_idx + row_step; i++) {
      rows.push(sheet.getRow(i));
    }
    return rows;
  }

  underline(rows: Row[],
            data: ReportRowData[],
            colStartNum: number,
            columns_before_data: number) {
    let firstReportRow = data[data.length - 1];
    // let table_cols_num = colStartNum + columns_before_data + firstReportRow.cellData.length + firstReportRow.summationResults.length;
    let table_cols_num = colStartNum + firstReportRow.reportCellData.length;
    for (let idx = colStartNum; idx < table_cols_num; idx++) {
      rows[0].getCell(idx).style.border = topMediumBorders;
    }
  }
}
