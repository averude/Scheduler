import { Worksheet } from "exceljs";
import { ReportData } from "../model/report-data";
import { DecorationData, HeaderSectionData } from "../model/decoration-data";
import { ReportDecorator } from "./report-decorator";
import {
  arialCyrBoldSize16,
  arialCyrSize12,
  arialCyrSize14,
  bottomThinBorders,
  centerAlign,
  leftAlign,
  rightAlign
} from "../styles/report-styles";
import { ReportSheet, ReportSheetParticipant } from "../../../model/report-sheet";

export abstract class AReportDecorator implements ReportDecorator {
  abstract REPORT_TYPE: string;

  decorate(sheet: Worksheet,
           reportData: ReportData,
           dataRowsNum: number,
           reportSheet: ReportSheet) {
    const reportMarkup    = reportData.reportMarkup;
    const numOfColumns    = reportData.tableData.headerData.length;
    const decorationData  = reportData.decorationData;

    this.decorateTop(sheet, reportData, reportSheet);

    const creator_row_start = reportMarkup.table_row_start_num + reportMarkup.table_header_height
      + (dataRowsNum * reportMarkup.table_data_row_step) + reportMarkup.table_creator_interval;

    if (reportSheet) {
      this.decorateBottom(sheet, reportData, reportSheet.creators, creator_row_start);
    }
  }

  decorateTop(sheet: Worksheet,
              reportData: ReportData,
              reportSheet: ReportSheet): void {
    const numberOfColumns = reportData.tableData.headerData.length;
    const reportMarkup    = reportData.reportMarkup;
    const decorationData  = reportData.decorationData;

    if (!sheet || !decorationData || !numberOfColumns || numberOfColumns <= 0 ) {
      return;
    }

    const approvedColInterval = 4;
    const approved_col_start_num = reportMarkup.sheet_col_start_num + numberOfColumns - approvedColInterval - 2;

    let extra = 0;
    if (reportSheet && (this.validate(reportSheet.agreed) || this.validate(reportSheet.approved))) {
      extra = 6;
      this.decorateHeaderSection(sheet, decorationData.agreed, reportSheet.agreed, reportMarkup.sheet_row_start_num, reportMarkup.sheet_col_start_num + 1, 1);
      this.decorateHeaderSection(sheet, decorationData.approved, reportSheet.approved, reportMarkup.sheet_row_start_num, approved_col_start_num, approvedColInterval);
    }

    this.decorateTableLabelSection(sheet, decorationData, reportSheet, reportMarkup.table_report_label, reportMarkup.sheet_row_start_num + extra, reportMarkup.sheet_col_start_num, numberOfColumns);

    sheet.getRow(1).height = 4;
    sheet.getColumn(1).width = 1;

    if (reportSheet && (this.validate(reportSheet.agreed) || this.validate(reportSheet.approved))) {
      sheet.getRow(6).height = 4;
      sheet.getRow(9).height = 4;
      sheet.getRow(11).height = 4;
    } else {
      sheet.getRow(3).height = 4;
      sheet.getRow(5).height = 4;
    }

    reportMarkup.table_row_start_num = reportMarkup.sheet_row_start_num + extra + 4;
  }

  decorateBottom(sheet: Worksheet,
                 reportData: ReportData,
                 creators: ReportSheetParticipant[],
                 start_row_num: number): void {
    const reportMarkup    = reportData.reportMarkup;

    if (!creators || !(creators.length > 0)) {
      return;
    }

    let row_num = start_row_num;

    creators.forEach(creator => {
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

  decorateHeaderSection(sheet,
                        sectionData: HeaderSectionData,
                        participant: ReportSheetParticipant,
                        start_row_num,
                        start_col_num,
                        col_interval: number) {
    if (sectionData && participant.position && participant.name) {
      const labelCell = sheet.getRow(start_row_num).getCell(start_col_num);
      labelCell.value = sectionData.label;
      labelCell.style.font = arialCyrSize12;

      const positionCell = sheet.getRow(start_row_num + 1).getCell(start_col_num);
      positionCell.value = participant.position;
      positionCell.style.font = arialCyrSize12;

      const personCell = sheet.getRow(start_row_num + 3).getCell(start_col_num + col_interval);
      personCell.value = participant.name;
      personCell.style.font = arialCyrSize12;

      let row = sheet.getRow(start_row_num + 5);
      for (let i = start_col_num; i < start_col_num + col_interval; i++) {
        row.getCell(i).style.border = bottomThinBorders;
      }

      const yearCell = sheet.getRow(start_row_num + 5).getCell(start_col_num + col_interval);
      yearCell.value = sectionData.year;
      yearCell.style.font = arialCyrSize12;
      yearCell.style.alignment = leftAlign;
    }
  }

  decorateTableLabelSection(sheet: Worksheet,
                            decorationData: DecorationData,
                            reportSheet: ReportSheet,
                            label: string,
                            start_row_num: number,
                            start_col_num: number,
                            numberOfColumns: number) {
    const sched_label_col_num = Math.round(numberOfColumns / 2) + start_col_num;
    const sched_and_serv_row_num = start_row_num + 2;
    const merge_start_col_num = start_col_num + 2;
    const merge_end_col_num = Math.round(numberOfColumns / 2) + start_col_num;

    const scheduleLabelCell = sheet.getRow(start_row_num).getCell(sched_label_col_num);
    scheduleLabelCell.value = label;
    scheduleLabelCell.style.font = arialCyrBoldSize16;

    sheet.mergeCells(sched_and_serv_row_num, merge_start_col_num, sched_and_serv_row_num, merge_end_col_num);
    const scheduleAndServiceNameCell = sheet.getCell(sched_and_serv_row_num, merge_start_col_num);
    scheduleAndServiceNameCell.value = reportSheet?.caption;
    scheduleAndServiceNameCell.style.font = arialCyrSize14;
    scheduleAndServiceNameCell.style.alignment = rightAlign;

    const miscCell = sheet.getCell(sched_and_serv_row_num, merge_end_col_num + 1);
    miscCell.value = 'на';
    miscCell.style.font = arialCyrSize14;
    miscCell.style.alignment = centerAlign;

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
  }

  private validate(sectionData: ReportSheetParticipant): boolean {
    return sectionData && !!sectionData.name && !!sectionData.position;
  }
}
