import { Row, Worksheet } from "exceljs";
import { SummationColumn } from "../../../../model/summation-column";
import { arialCyrSize10 } from "../styles/report-styles";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportCreator } from "./report-creator";
import { SCHEDULE_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { ReportMarkup } from "../model/report-markup";
import { ScheduleReportStyles } from "../styles/schedule-report-styles";

export class ScheduleReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = SCHEDULE_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  styleColumns(sheet: Worksheet,
               daysInMonth: number,
               summationColumnsCount: number,
               reportMarkup: ReportMarkup) {
    let col_idx = reportMarkup.col_start_num;
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

  setHeaderRowsHeight(rows: Row[]) {
    rows[1].height = 35;
  }

  setBeforeDateHeaderCells(rows: Row[],
                           col_idx: number,
                           last_header_row_number: number,
                           sheet: Worksheet,
                           reportMarkup: ReportMarkup) {
    sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_number, col_idx);
    this.cellFiller.fill(rows, col_idx++, '№', ScheduleReportStyles.idHeaderCellStyle);

    sheet.mergeCells(reportMarkup.row_start_num, col_idx, last_header_row_number, col_idx);
    this.cellFiller.fill(rows, col_idx++, 'П.І.Б.', ScheduleReportStyles.nameHeaderCellStyle);

    this.cellFiller.fill(rows, col_idx++, [null, 'Посада', null], ScheduleReportStyles.positionHeaderCellStyle);

    let monthDateCaption = rows[0].getCell(col_idx);
    monthDateCaption.value = 'Числа місяця';
    monthDateCaption.style.font = arialCyrSize10;
  }

  setDateHeaderCells(rows: Row[],
                     col_idx: number,
                     calendarDays: CalendarDay[]) {
    calendarDays.forEach(day => {
      this.cellFiller.fill(rows, col_idx++, [null, null, day.dayOfMonth], ScheduleReportStyles.scheduleHeaderCellStyle,
        (cell, row_index) => {
          if (row_index == 1) {
            if (day.weekend) {
              cell.style = ScheduleReportStyles.weekendScheduleHeaderCellStyle;
            } else if (day.holiday) {
              cell.style = ScheduleReportStyles.holidayScheduleHeaderCellStyle;
            }
          }
        });
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
      this.cellFiller.fill(rows, col_idx++, column.name, ScheduleReportStyles.sumHeaderCellStyle);
    });
  }
}
