import { Worksheet } from "exceljs";
import {
  arialCyrBoldSize16,
  arialCyrSize12,
  arialCyrSize14,
  bottomThinBorders,
  centerAlign,
  leftAlign,
  rightAlign
} from "../styles/report-styles";
import { DecorationData } from "../model/decoration-data";

export class ReportDecorator {

  decorateTop(sheet: Worksheet,
              decorationData: DecorationData,
              daysInMonth: number) {
    if (!sheet || !decorationData || !daysInMonth || daysInMonth <= 0 || daysInMonth > 31) {
      return;
    }

    const start_row_num = 2;
    const start_col_num = 3;
    const range_between_agreed_and_approved = daysInMonth - 3;

    const position_row_num  = start_row_num + 1;
    const person_row_num    = start_row_num + 3;
    const year_row_num      = start_row_num + 5;

    const agreed_col_values_num = start_col_num + 1;
    const approved_col_labels_num = start_col_num + range_between_agreed_and_approved;
    const approved_col_values_num = approved_col_labels_num + 5;

    const sched_label_row_num = start_row_num + 6;
    const sched_label_col_num = approved_col_labels_num - 11;
    const sched_and_serv_row_num = sched_label_row_num + 2;
    const merged_cells_num = 16 - (31 - daysInMonth);
    const merge_start_col_num = start_col_num + 2;
    const merge_end_col_num = merge_start_col_num + merged_cells_num;

    if (decorationData.agreedPosition && decorationData.agreedPerson) {
      const agreedCell = sheet.getRow(start_row_num).getCell(start_col_num);
      agreedCell.value = 'Погоджено';
      agreedCell.style.font = arialCyrSize12;

      const agreedPositionCell = sheet.getRow(position_row_num).getCell(start_col_num);
      agreedPositionCell.value = decorationData.agreedPosition;
      agreedPositionCell.style.font = arialCyrSize12;

      const agreedPersonCell = sheet.getRow(person_row_num).getCell(agreed_col_values_num);
      agreedPersonCell.value = decorationData.agreedPerson;
      agreedPersonCell.style.font = arialCyrSize12;

      sheet.getRow(year_row_num).getCell(start_col_num).style.border = bottomThinBorders;

      const agreedYearCell = sheet.getRow(year_row_num).getCell(agreed_col_values_num);
      agreedYearCell.value = decorationData.year;
      agreedYearCell.style.font = arialCyrSize12;
      agreedYearCell.style.alignment = leftAlign;
    }

    if (decorationData.approvedPerson && decorationData.approvedPosition) {
      const approvedCell = sheet.getRow(start_row_num).getCell(approved_col_labels_num);
      approvedCell.value = 'ЗАТВЕРДЖУЮ';
      approvedCell.style.font = arialCyrSize12;

      const approvedPositionCell = sheet.getRow(position_row_num).getCell(approved_col_labels_num);
      approvedPositionCell.value = decorationData.approvedPosition;
      approvedPositionCell.style.font = arialCyrSize12;

      const approvedPersonCell = sheet.getRow(person_row_num).getCell(approved_col_values_num);
      approvedPersonCell.value = decorationData.approvedPerson;
      approvedPersonCell.style.font = arialCyrSize12;

      let row = sheet.getRow(7);
      for (let i = approved_col_labels_num; i < approved_col_values_num; i++) {
        row.getCell(i).style.border = bottomThinBorders;
      }

      const approvedYearCell = sheet.getRow(year_row_num).getCell(approved_col_values_num);
      approvedYearCell.value = decorationData.year;
      approvedYearCell.style.font = arialCyrSize12;
      approvedYearCell.style.alignment = leftAlign;
    }

    //

    const scheduleLabelCell = sheet.getRow(sched_label_row_num).getCell(sched_label_col_num);
    scheduleLabelCell.value = 'ГРАФІК';
    scheduleLabelCell.style.font = arialCyrBoldSize16;

    sheet.mergeCells(sched_and_serv_row_num, merge_start_col_num, sched_and_serv_row_num, merge_end_col_num);
    const scheduleAndServiceNameCell = sheet.getCell(sched_and_serv_row_num, merge_start_col_num);
    scheduleAndServiceNameCell.value = decorationData.schedAndServiceName;
    scheduleAndServiceNameCell.style.font = arialCyrSize14;
    scheduleAndServiceNameCell.style.alignment = rightAlign;

    const miscCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 1);
    miscCell.value = 'на';
    miscCell.style.font = arialCyrSize14;

    sheet.mergeCells(sched_and_serv_row_num, merge_end_col_num + 2, sched_and_serv_row_num, merge_end_col_num + 4);
    const monthCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 2);
    monthCell.value = decorationData.month;
    monthCell.style.font = arialCyrSize14;
    monthCell.style.alignment = centerAlign;

    sheet.mergeCells(sched_and_serv_row_num, merge_end_col_num + 5, sched_and_serv_row_num, merge_end_col_num + 7);
    const yearCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 5);
    yearCell.value = decorationData.year + 'р.';
    yearCell.style.font = arialCyrSize14;
    yearCell.style.alignment = leftAlign;

    sheet.getRow(1).height = 4;
    sheet.getRow(6).height = 4;
    sheet.getRow(9).height = 4;
    sheet.getRow(11).height = 4;

    sheet.getColumn(1).width = 1;
  }

  decorateBottom(sheet: Worksheet,
                 decorationData: DecorationData,
                 start_row_num: number) {
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
