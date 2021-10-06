import { Worksheet } from "exceljs";
import { ReportData } from "../model/report-data";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { ReportOptions } from "../model/report-options";

export interface ReportCreator {
  REPORT_TYPE: string;

  create(sheet: Worksheet,
         reportData: ReportData,
         rowGroups: RowGroup[],
         reportOptions: ReportOptions);
}
