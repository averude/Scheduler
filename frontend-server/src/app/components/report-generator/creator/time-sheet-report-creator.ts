import { ReportCreator } from "./report-creator";
import { Row, Worksheet } from "exceljs";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { ReportOptions } from "../model/report-options";
import { ReportData } from "../model/report-data";

export class TimeSheetReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  createDataSection(sheet: Worksheet,
                    rowGroups: RowGroup[],
                    reportData: ReportData,
                    reportOptions: ReportOptions): void {
    let idx = 1;
    rowGroups.forEach(group => group.rows
      ?.forEach(row => row.cells[0].value.value = [null, idx++]));
    super.createDataSection(sheet, rowGroups, reportData, reportOptions);
  }

  setHeaderRowsHeight(rows: Row[]) {
    rows[0].height = 32;
  }
}
