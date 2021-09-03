import { Row, Worksheet } from "exceljs";
import { arialCyrSize10 } from "../styles/report-styles";
import { ReportCreator } from "./report-creator";
import { SCHEDULE_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { ReportMarkup } from "../model/report-markup";
import { ReportHeaderCell } from "../model/report-cell-value";
import { Row as ReportRow } from "../../../lib/ngx-schedule-table/model/data/row";

export class ScheduleReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = SCHEDULE_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  createHeader(sheet: Worksheet,
               headerCells: ReportHeaderCell[],
               reportMarkup: ReportMarkup) {
    super.createHeader(sheet, headerCells, reportMarkup);
    let monthDateCaption = sheet.getCell(reportMarkup.table_row_start_num, reportMarkup.sheet_col_start_num + reportMarkup.table_cols_before_data);
    monthDateCaption.value = 'Числа місяця';
    monthDateCaption.style.font = arialCyrSize10;
  }

  createDataSection(sheet: Worksheet,
                    data: ReportRow[],
                    reportMarkup: ReportMarkup): void {
    data.forEach((row, index) => row.cells[0].value.value = index + 1);
    super.createDataSection(sheet, data, reportMarkup);
  }

  setHeaderRowsHeight(rows: Row[]) {
    rows[1].height = 35;
  }
}
