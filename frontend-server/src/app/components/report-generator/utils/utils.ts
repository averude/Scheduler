import { ReportData } from "../model/report-row";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { binarySearch, binarySearchInsertIndex } from "../../../lib/ngx-schedule-table/utils/collection-utils";
import { HasEmployeePosition } from "../collectors/abstract-report-data-collector";

export function validate(reportData: ReportData): boolean {
  return !reportData || !reportData.tableData
    || !reportData.tableData.headerData || reportData.tableData.headerData.length == 0;
}

export function inline(tableData: TableData): Row[] {
  return tableData.groups
    .map(group => group.rows)
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
}

export const INSERT_INDEX_FN = ((rows: Row[],
                                 value: HasEmployeePosition) => {
  return binarySearchInsertIndex(rows, (mid => {
    const valA = <HasEmployeePosition>mid.value;
    const valB = value;

    const employeeA = valA.employee;
    const employeeB = valB.employee;

    return (valA.mainPosition.uiPriority - valB.mainPosition.uiPriority)
      || (valA.mainPosition.id - valB.mainPosition.id)
      || employeeA.secondName.localeCompare(employeeB.secondName)
      || employeeA.firstName.localeCompare(employeeB.firstName);
  }));
});

export const EXISTING_ROW_GETTER = ((rows: Row[],
                                     value: HasEmployeePosition) => {
  return binarySearch(rows, ((mid) => {
    const valA = <HasEmployeePosition>mid.value;
    const valB = value;

    const employeeA = valA.employee;
    const employeeB = valB.employee;

    return (valA.mainPosition.uiPriority - valB.mainPosition.uiPriority)
      || (valA.mainPosition.id - valB.mainPosition.id)
      || employeeA.secondName.localeCompare(employeeB.secondName)
      || employeeA.firstName.localeCompare(employeeB.firstName);
  }));

});

export const MERGE_DECISION_FN = ((row: Row, value: HasEmployeePosition) => {
  const oldValue = <HasEmployeePosition>row.value;

  return oldValue.position.id === value.position.id
    && oldValue.employee.id === value.employee.id;
});
