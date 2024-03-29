import { Row, Worksheet } from "exceljs";
import { arialCyrSize10 } from "../styles/report-styles";
import { ReportCreator } from "./report-creator";
import { SCHEDULE_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { ReportData } from "../model/report-data";
import { ReportOptions } from "../model/report-options";

export class ScheduleReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = SCHEDULE_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  createHeader(sheet: Worksheet,
               reportData: ReportData,
               reportOptions: ReportOptions) {
    super.createHeader(sheet, reportData, reportOptions);

    const reportMarkup = reportData.reportMarkup;
    let monthDateCaption = sheet.getCell(reportMarkup.table_row_start_num, reportMarkup.sheet_col_start_num + reportMarkup.table_cols_before_data);
    monthDateCaption.value = 'Числа місяця';
    monthDateCaption.style.font = arialCyrSize10;
  }

  createDataSection(sheet: Worksheet,
                    rowGroups: RowGroup[],
                    reportData: ReportData,
                    reportOptions: ReportOptions): void {
    let idx = 1;
    rowGroups.forEach(group => group.rows
      ?.forEach(row => row.cells[0].value.value = idx++));
    super.createDataSection(sheet, rowGroups, reportData, reportOptions);
  }

  setHeaderRowsHeight(rows: Row[]) {
    rows[1].height = 35;
  }
}
