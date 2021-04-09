import { ReportCreator } from "./report-creator";
import { Row, Worksheet } from "exceljs";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";
import { ReportRow } from "../model/report-row";
import { ReportMarkup } from "../model/report-markup";

export class TimeSheetReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  createDataSection(sheet: Worksheet,
                    data: ReportRow[],
                    reportMarkup: ReportMarkup): void {
    data.forEach((row, index) => row.reportCellData[0].value = [null, index + 1]);
    super.createDataSection(sheet, data, reportMarkup);
  }

  setHeaderRowsHeight(rows: Row[]) {
    rows[0].height = 32;
  }
}
