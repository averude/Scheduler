import { ReportData } from "../model/report-data";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";

export function validate(reportData: ReportData): boolean {
  return !reportData || !reportData.tableData
    || !reportData.tableData.headerData || reportData.tableData.headerData.length == 0;
}

export function inline(tableData: TableData): Row[] {
  return tableData.groups
    .map(group => group.rows)
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
}
