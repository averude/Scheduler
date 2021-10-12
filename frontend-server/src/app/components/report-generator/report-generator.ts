import { ReportData } from "./model/report-data";
import * as ExcelJS from "exceljs";
import { Buffer } from "exceljs";
import { ReportCreator } from "./creator/report-creator";
import { ReportDecorator } from "./decorator/report-decorator";
import { Injectable } from "@angular/core";
import { ReportSheetDTO } from "../../model/dto/report-sheet-dto";
import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { validate } from "./utils/utils";
import { ReportOptions } from "./model/report-options";

@Injectable()
export class ReportGenerator {

  generate(reportCreator: ReportCreator,
           reportDecorator: ReportDecorator,
           reportData: ReportData,
           reportSheets: ReportSheetDTO[],
           reportOptions: ReportOptions): Promise<Buffer> {
    if (validate(reportData)) {
      return Promise.reject('Empty data');
    }

    const workbook = new ExcelJS.Workbook();

    if (reportOptions.divideBySubDep) {
      this.splitIntoSheets(reportSheets, reportData.tableData)
        .forEach((sheet, index) => {
          if (sheet.groups && sheet.groups.length > 0 && sheet.groups.some(group => group.rows.length > 0)) {
            const worksheet = workbook.addWorksheet(sheet.value.name);

            const numOfRows = this.calcNumOfRows(sheet);
            reportDecorator.decorate(worksheet, reportData, numOfRows, reportSheets[index].reportSheet);
            reportCreator.create(worksheet, reportData, sheet.groups, reportOptions);
          }
        });
    } else {
      const worksheet = workbook.addWorksheet('Schedule');
      const groups = reportData.tableData.groups
        .sort((a,b) => (b.value.uiPriority - a.value.uiPriority) || a.value.id - b.value.id);

      reportDecorator.decorate(worksheet, reportData, reportData.tableData.groups.length, null);
      reportCreator.create(worksheet, reportData, groups, reportOptions);
    }

    return workbook.xlsx.writeBuffer();
  }

  private splitIntoSheets(sheets: ReportSheetDTO[],
                          tableData: TableData) {
    const arr = [];

    sheets.forEach(dto => {

      const sheet = {
        id: dto.reportSheet.id,
        value: dto.reportSheet,
        groups: []
      };

      dto.shiftIds.forEach(shiftId => {
        const reportGroupData = tableData.findRowGroup(shiftId);
        if (reportGroupData) {
          sheet.groups.push(reportGroupData);
        }
      });

      arr.push(sheet);
    });

    return arr;
  }

  private calcNumOfRows(sheet) {
    let result = 0;
    sheet.groups.forEach(group => group.rows.forEach(row => result++));
    return result;
  }
}
