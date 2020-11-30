import { ReportData } from "./model/report-row-data";
import * as ExcelJS from "exceljs";
import { Buffer } from "exceljs";
import { ReportCreator } from "./creator/report-creator";
import { ReportDecorator } from "./decorator/report-decorator";
import { Injectable } from "@angular/core";

@Injectable()
export class ReportGenerator {

  generate(reportCreator: ReportCreator,
           reportDecorator: ReportDecorator,
           reportData: ReportData): Promise<Buffer> {
    if (this.validate(reportData)) {
      return Promise.reject('Empty data');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Schedule');

    reportDecorator.decorate(sheet, reportData.reportMarkup, reportData.tableData, reportData.decorationData);
    reportCreator.create(sheet, reportData.headerData, reportData.tableData, reportData.reportMarkup);

    return workbook.xlsx.writeBuffer();
  }

  private validate(reportData: ReportData): boolean {
    return !reportData || !reportData.tableData || reportData.tableData.length == 0
      || !reportData.headerData || reportData.headerData.length == 0;
  }
}
