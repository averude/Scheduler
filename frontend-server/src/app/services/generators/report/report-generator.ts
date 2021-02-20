import { ReportData, ReportGroupData, ReportRowData } from "./model/report-row-data";
import * as ExcelJS from "exceljs";
import { Buffer } from "exceljs";
import { ReportCreator } from "./creator/report-creator";
import { ReportDecorator } from "./decorator/report-decorator";
import { Injectable } from "@angular/core";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { ReportSheetDTO } from "../../../model/dto/report-sheet-dto";

@Injectable()
export class ReportGenerator {

  generate(reportCreator: ReportCreator,
           reportDecorator: ReportDecorator,
           reportData: ReportData,
           reportSheets: ReportSheetDTO[],
           divideBySubDep: boolean): Promise<Buffer> {
    if (this.validate(reportData)) {
      return Promise.reject('Empty data');
    }

    const workbook = new ExcelJS.Workbook();

    if (divideBySubDep) {
      this.splitIntoSheets(reportSheets, reportData.tableData)
        .forEach((group, index) => {
        if (group.rows && group.rows.length > 0) {
          const worksheet = workbook.addWorksheet(group.name);

          reportDecorator.decorate(worksheet, reportData, group.rows.length, reportSheets[index].reportSheet);
          reportCreator.create(worksheet, reportData, group.rows);
        }
      });
    } else {
      const worksheet = workbook.addWorksheet('Schedule');

      reportDecorator.decorate(worksheet, reportData, reportData.tableData.length, null);
      const rows = this.inline(reportData.tableData);
      reportCreator.create(worksheet, reportData, rows);
    }

    return workbook.xlsx.writeBuffer();
  }

  private validate(reportData: ReportData): boolean {
    return !reportData || !reportData.tableData || reportData.tableData.length == 0
      || !reportData.headerData || reportData.headerData.length == 0;
  }

  private inline(groups: ReportGroupData[]): ReportRowData[] {
    return groups.map(group => group.rows)
      .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
  }

  private splitIntoSheets(sheets: ReportSheetDTO[],
                          shiftGroups: ReportGroupData[]) {
    const groups: ReportGroupData[] = [];
    sheets.forEach(dto => {
      const group = new ReportGroupData();
      group.id    = dto.reportSheet.id;
      group.name  = dto.reportSheet.name;
      group.rows  = [];

      dto.shiftIds.forEach(shiftId => {
        const reportGroupData = binarySearch(shiftGroups, (mid => mid.id - shiftId));
        if (reportGroupData) {
          group.rows = group.rows.concat(reportGroupData.rows);
        }
      });

      groups.push(group);
    });

    return groups;
  }
}
