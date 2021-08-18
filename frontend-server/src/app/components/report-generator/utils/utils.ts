import { ReportData, ReportRow } from "../model/report-row";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";

export function validate(reportData: ReportData): boolean {
  return !reportData || !reportData.tableData
    || !reportData.headerData || reportData.headerData.length == 0;
}

// export function inline(groups: ReportGroup[]): ReportRow[] {
//   return groups.map(group => group.rows)
//     .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
// }

export function inline(tableData: TableData): ReportRow[] {
  return <ReportRow[]> tableData.groups
    .map(group => group.rows)
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
}
