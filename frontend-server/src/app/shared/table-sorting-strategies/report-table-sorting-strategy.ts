import { RowGroup, TableSortingStrategy } from "../../lib/ngx-schedule-table/model/data/row-group";
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { binarySearch, binarySearchInsertIndex } from "../../lib/ngx-schedule-table/utils/collection-utils";
import { HasEmployeePosition } from "../../components/report-generator/collectors/abstract-report-data-collector";
import { Shift } from "../../model/shift";

export class ReportTableSortingStrategy implements TableSortingStrategy {

  decideMerge(row: Row, value: any): boolean {
    return false;
  }

  getRow(rows: Row[], value: any): Row {
    return binarySearch(rows, ((mid) => {
      const valA = <HasEmployeePosition> mid.value;
      const valB = value;

      const employeeA = valA.employee;
      const employeeB = valB.employee;

      return (valB.mainPosition.uiPriority - valA.mainPosition.uiPriority)
        || (valA.mainPosition.id - valB.mainPosition.id)
        || employeeA.secondName.localeCompare(employeeB.secondName)
        || employeeA.firstName.localeCompare(employeeB.firstName);
    }));
  }

  getRowInsertIndex(rows: Row[], value: any): number {
    return binarySearchInsertIndex(rows, (mid => {
      const valA = <HasEmployeePosition> mid.value;
      const valB = value;

      const employeeA = valA.employee;
      const employeeB = valB.employee;

      return (valB.mainPosition.uiPriority - valA.mainPosition.uiPriority)
        || (valA.mainPosition.id - valB.mainPosition.id)
        || employeeA.secondName.localeCompare(employeeB.secondName)
        || employeeA.firstName.localeCompare(employeeB.firstName);
    }));
  }

  getRowGroup(groups: RowGroup[], value: Shift): RowGroup {
    return binarySearch(groups, (mid => {
      const shift = <Shift> mid.value;
      return value.uiPriority - shift.uiPriority || shift.id - value.id;
    }));
  }

  getRowGroupInsertIndex(groups: RowGroup[], value: Shift): number {
    return binarySearchInsertIndex(groups, (mid => {
      const shift = <Shift> mid.value;
      return value.uiPriority - shift.uiPriority || shift.id - value.id;
    }));
  }
}
