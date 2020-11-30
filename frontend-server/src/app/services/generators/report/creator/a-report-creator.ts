import { Row, Worksheet } from "exceljs";
import { ReportRowData } from "../model/report-row-data";
import { CellFiller } from "../core/cell-filler";
import { topMediumBorders } from "../styles/report-styles";
import { ReportMarkup } from "../model/report-markup";
import { ReportCreator } from "./report-creator";
import { ReportHeaderCell } from "../model/report-cell-data";

export abstract class AReportCreator implements ReportCreator {
  abstract REPORT_TYPE: string;

  constructor(protected cellFiller: CellFiller) {
  }

  create(sheet: Worksheet,
         headerCells: ReportHeaderCell[],
         data: ReportRowData[],
         reportMarkup: ReportMarkup) {
    this.createHeader(sheet, headerCells, reportMarkup);
    this.createDataSection(sheet, data, reportMarkup);
  }

  createHeader(sheet: Worksheet,
               headerCells: ReportHeaderCell[],
               reportMarkup: ReportMarkup) {
    const last_header_row_number = reportMarkup.table_row_start_num + reportMarkup.table_header_height;
    let col_idx = reportMarkup.sheet_col_start_num;

    const rows = this.getRows(reportMarkup.table_row_start_num, reportMarkup.table_header_height + 1, sheet);

    this.setHeaderRowsHeight(rows);

    headerCells.forEach((headerCell, index) => {
      const column = sheet.getColumn(col_idx);
      column.key = `column_${index}`;
      if (headerCell.width) {
        column.width = headerCell.width;
      }

      if (headerCell.merge) {
        this.cellFiller.fillWithMerge(sheet, reportMarkup.table_row_start_num, last_header_row_number,
          rows, col_idx++, headerCell.value, headerCell.style);
      } else {
        this.cellFiller.fill(rows, col_idx++, headerCell.value, headerCell.style);
      }
    });

    rows.forEach(row => row.commit());
  }

  abstract setHeaderRowsHeight(rows: Row[]);

  createDataSection(sheet: Worksheet,
                    data: ReportRowData[],
                    reportMarkup: ReportMarkup): void {
    let row_idx = reportMarkup.table_row_start_num + reportMarkup.table_header_height + 1;

    for (let row_data_idx = 0; row_data_idx <= data.length; row_idx+=reportMarkup.table_data_row_step, row_data_idx++) {
      const rows = this.getRows(row_idx, reportMarkup.table_data_row_step, sheet);

      if (row_data_idx == data.length) {
        this.underline(rows, data, reportMarkup.sheet_col_start_num);
        break;
      }

      const rowData = data[row_data_idx];
      let col_idx = reportMarkup.sheet_col_start_num;

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
            colStartNum: number) {
    let firstReportRow = data[data.length - 1];
    let table_cols_num = colStartNum + firstReportRow.reportCellData.length;
    for (let idx = colStartNum; idx < table_cols_num; idx++) {
      rows[0].getCell(idx).style.border = topMediumBorders;
    }
  }
}
