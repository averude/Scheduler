import { ReportData, ReportGroup, ReportRow } from "./model/report-row";
import * as ExcelJS from "exceljs";
import { Buffer } from "exceljs";
import { ReportCreator } from "./creator/report-creator";
import { ReportDecorator } from "./decorator/report-decorator";
import { Injectable } from "@angular/core";
import { ReportSheetDTO } from "../../model/dto/report-sheet-dto";
import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { inline, validate } from "./utils/utils";

@Injectable()
export class ReportGenerator {

  generate(reportCreator: ReportCreator,
           reportDecorator: ReportDecorator,
           reportData: ReportData,
           reportSheets: ReportSheetDTO[],
           divideBySubDep: boolean): Promise<Buffer> {
    if (validate(reportData)) {
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

      reportDecorator.decorate(worksheet, reportData, reportData.tableData.groups.length, null);
      const rows = inline(reportData.tableData);
      reportCreator.create(worksheet, reportData, rows);
    }

    return workbook.xlsx.writeBuffer();
  }

  private splitIntoSheets(sheets: ReportSheetDTO[],
                          tableData: TableData) {
    const groups: ReportGroup[] = [];

    sheets.forEach(dto => {
      const group = new ReportGroup();
      group.id    = dto.reportSheet.id;
      group.name  = dto.reportSheet.name;
      group.rows  = [];

      dto.shiftIds.forEach(shiftId => {
        const reportGroupData = tableData.findRowGroup(shiftId);
        if (reportGroupData) {
          group.rows = group.rows.concat(<ReportRow[]> reportGroupData.rows);
        }
      });

      groups.push(group);
    });

    return groups;
  }
}
