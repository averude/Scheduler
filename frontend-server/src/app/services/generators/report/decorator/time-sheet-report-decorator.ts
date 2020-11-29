import { Worksheet } from "exceljs";
import { DecorationData } from "../model/decoration-data";
import { arialCyrSize12, bottomThinBorders, rightAlign } from "../styles/report-styles";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { AReportDecorator } from "./a-report-decorator";
import { ReportMarkup } from "../model/report-markup";

export class TimeSheetReportDecorator extends AReportDecorator {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  decorateTop(sheet: Worksheet,
              reportMarkup: ReportMarkup,
              decorationData: DecorationData,
              daysInMonth: number): void {
    if (!sheet || !decorationData || !daysInMonth || daysInMonth <= 0 || daysInMonth > 31) {
      return;
    }

    const start_row_num = 2;
    const start_col_num = 3;

    this.decorateTableLabelSection(sheet, decorationData, 'ТАБЕЛЬ', start_row_num, start_col_num, daysInMonth);

    sheet.getRow(1).height = 4;
    sheet.getRow(3).height = 4;
    sheet.getRow(5).height = 4;

    sheet.getColumn(1).width = 1;
  }

  decorateBottom(sheet: Worksheet,
                 reportMarkup: ReportMarkup,
                 decorationData: DecorationData,
                 start_row_num: number): void {
    let row_num = start_row_num;
    decorationData.documentCreators.forEach(creator => {
      if (creator.name && creator.position) {
        let col_start_num = 5;

        const position_merge_col_start = col_start_num;
        const position_merge_col_end = col_start_num + 13;
        const underscore_col_start = position_merge_col_end + 1;
        const underscore_col_end = underscore_col_start + 4;

        sheet.mergeCells(row_num, position_merge_col_start, row_num, position_merge_col_end);
        let positionCell = sheet.getCell(row_num, col_start_num);
        positionCell.value = creator.position;
        positionCell.style.font = arialCyrSize12;
        positionCell.style.alignment = rightAlign;

        for (let col_num = underscore_col_start; col_num <= underscore_col_end; col_num++) {
          sheet.getCell(row_num, col_num).style.border = bottomThinBorders;
        }

        let nameCell = sheet.getCell(row_num, underscore_col_end + 1);
        nameCell.value = creator.name;
        nameCell.style.font = arialCyrSize12;

        row_num += 3;
      }
    });
  }
}
