import { Worksheet } from "exceljs";
import { arialCyrSize12, bottomThinBorders, rightAlign } from "../styles/report-styles";
import { DecorationData } from "../model/decoration-data";
import { SCHEDULE_REPORT } from "../model/report-types";
import { AReportDecorator } from "./a-report-decorator";
import { ReportMarkup } from "../model/report-markup";

export class ScheduleReportDecorator extends AReportDecorator {
  REPORT_TYPE: string = SCHEDULE_REPORT;

  decorateTop(sheet: Worksheet,
              reportMarkup: ReportMarkup,
              decorationData: DecorationData,
              daysInMonth: number): void {
    if (!sheet || !decorationData || !daysInMonth || daysInMonth <= 0 || daysInMonth > 31) {
      return;
    }

    const start_row_num = 2;
    const start_col_num = 3;
    const range_between_agreed_and_approved = daysInMonth - 3;

    const approved_col_labels_num = start_col_num + range_between_agreed_and_approved;

    this.decorateHeaderSection(sheet, {
      label: 'Погоджено',
      position: decorationData.agreedPosition,
      person: decorationData.agreedPerson,
      year: decorationData.year
    }, start_row_num, start_col_num, 1);

    this.decorateHeaderSection(sheet, {
      label: 'ЗАТВЕРДЖУЮ',
      position: decorationData.approvedPosition,
      person: decorationData.approvedPerson,
      year: decorationData.year
    }, start_row_num, approved_col_labels_num, 5);

    this.decorateTableLabelSection(sheet, decorationData, 'ГРАФІК', start_row_num + 6, start_col_num, daysInMonth);

    sheet.getRow(1).height = 4;
    sheet.getRow(6).height = 4;
    sheet.getRow(9).height = 4;
    sheet.getRow(11).height = 4;
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
