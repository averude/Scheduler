import { ReportCreator } from "./report-creator";
import { Row, Worksheet } from "exceljs";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../../model/summation-column";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { ReportMarkup } from "../model/report-markup";
import { TimeSheetStyles } from "../styles/time-sheet-styles";

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

  setHeaderRowsHeight(rows: Row[]) {
    rows[0].height = 32;
  }

  setBeforeDateHeaderCells(rows: Row[],
                           col_idx: number,
                           last_header_row_number: number,
                           sheet: Worksheet,
                           reportMarkup: ReportMarkup) {
    sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_number, col_idx);
    this.cellFiller.fill(rows, col_idx++, '№', TimeSheetStyles.idHeaderCellStyle);

    sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_number, col_idx);
    this.cellFiller.fill(rows, col_idx++, 'П.І.Б.', TimeSheetStyles.nameHeaderCellStyle);
  }

  setDateHeaderCells(rows: Row[],
                     col_idx: number,
                     calendarDays: CalendarDay[]) {
    calendarDays.forEach(day => {
      this.cellFiller.fill(rows, col_idx++, [null, day.dayOfMonth], TimeSheetStyles.dataHeaderCellStyle);
    });
  }

  setSumHeaderCells(rows: Row[],
                    col_idx: number,
                    summationColumns: SummationColumn[],
                    last_header_row_number: number,
                    sheet: Worksheet,
                    reportMarkup: ReportMarkup) {
    summationColumns.forEach(column => {
      sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_number, col_idx);
      this.cellFiller.fill(rows, col_idx++, column.name, TimeSheetStyles.sumHeaderCellStyle);
    });
  }
}
