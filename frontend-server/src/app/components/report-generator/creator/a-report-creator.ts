import { Row, Worksheet } from "exceljs";
import { ReportData } from "../model/report-data";
import { CellFiller } from "../core/cell-filler";
import { ReportCreator } from "./report-creator";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { ReportOptions } from "../model/report-options";

export abstract class AReportCreator implements ReportCreator {
  abstract REPORT_TYPE: string;

  constructor(protected cellFiller: CellFiller) {
  }

  create(sheet: Worksheet,
         reportData: ReportData,
         rowGroups: RowGroup[],
         reportOptions: ReportOptions) {
    this.createHeader(sheet, reportData, reportOptions);
    this.createDataSection(sheet, rowGroups, reportData, reportOptions);
  }

  createHeader(sheet: Worksheet,
               reportData: ReportData,
               reportOptions: ReportOptions) {
    const headerCells = reportData.tableData.headerData;
    const reportMarkup = reportData.reportMarkup;

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
                    rowGroups: RowGroup[],
                    reportData: ReportData,
                    reportOptions: ReportOptions): void {
    const reportMarkup = reportData.reportMarkup;
    const colNum = reportData.tableData.headerData.length;

    let row_idx = reportMarkup.table_row_start_num + reportMarkup.table_header_height + 1;

    let lastRows;

    for (let group_idx = 0; group_idx < rowGroups.length; group_idx++) {
      const dataRows = rowGroups[group_idx].rows;
      if (!dataRows || dataRows.length == 0) {
        continue;
      }

      for (let row_data_idx = 0; row_data_idx < dataRows.length; row_idx+=reportMarkup.table_data_row_step, row_data_idx++) {
        const rows = this.getRows(row_idx, reportMarkup.table_data_row_step, sheet);

        const rowData = dataRows[row_data_idx];
        let col_idx = reportMarkup.sheet_col_start_num;

        if (rowData && rowData.cells) {
          rowData.cells.forEach(cell => {
            const cellValue = cell.value;
            if (cellValue.merge && cellValue.value.length > 1) {
              this.cellFiller.fillWithMerge(sheet, row_idx, row_idx + cellValue.value.length - 1,
                rows, col_idx++, cellValue.value, cellValue.style);
            } else {
              this.cellFiller.fill(rows, col_idx++, cellValue.value, cellValue.style);
            }
          });
        }

        if (row_data_idx === 0 && reportOptions.highlightGroups) {
          this.topBorders(rows, colNum, reportMarkup.sheet_col_start_num);
        }

        rows.forEach(row => row.commit());
        lastRows = rows;
      }
    }

    if (lastRows) {
      this.underline(lastRows, colNum, reportMarkup.sheet_col_start_num);
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

  topBorders(rows: Row[],
             colNum: number,
             colStartNum: number) {
    this.changeStyle(rows[0], colNum, colStartNum, (borderStyle => borderStyle.top = {style: 'medium'}));
  }

  underline(rows: Row[],
            colNum: number,
            colStartNum: number) {
    this.changeStyle(rows[rows.length - 1], colNum, colStartNum, (borderStyle => borderStyle.bottom = {style: 'medium'}));
  }

  private changeStyle(row: Row,
                      colNum: number,
                      colStartNum: number,
                      fn: (borderStyle) => void) {
    let table_cols_num = colStartNum + colNum;

    let lastStyle;
    let cachedCopy;

    for (let idx = colStartNum; idx < table_cols_num; idx++) {
      const cell = row.getCell(idx);
      const oldStyle = cell.style;

      if (oldStyle === lastStyle) {
        cell.style = cachedCopy;
      } else {
        const newStyle = JSON.parse(JSON.stringify(oldStyle));
        fn(newStyle.border);
        cell.style = newStyle;
        lastStyle = oldStyle;
        cachedCopy = newStyle;
      }
    }
  }
}
