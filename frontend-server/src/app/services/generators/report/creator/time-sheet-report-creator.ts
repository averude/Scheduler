import { ReportCreator } from "./report-creator";
import { Row } from "exceljs";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";
import { AReportCreator } from "./a-report-creator";

export class TimeSheetReportCreator extends AReportCreator implements ReportCreator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  constructor(cellFiller: CellFiller) {
    super(cellFiller);
  }

  setHeaderRowsHeight(rows: Row[]) {
    rows[0].height = 32;
  }
}
