import { RowGroup, TableSortingStrategy } from "../../lib/ngx-schedule-table/model/data/row-group";
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { binarySearch, binarySearchInsertIndex } from "../../lib/ngx-schedule-table/utils/collection-utils";
import { ScheduleRowValue } from "../../components/calendar/model/table-data";
import { Shift } from "../../model/shift";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleTableSortingStrategy implements TableSortingStrategy {

  decideMerge(row: Row, value: any): boolean {
    const oldValue = <ScheduleRowValue> row.value;

    return oldValue.position.id === value.position.id
      && oldValue.employee.id === value.employee.id
      && oldValue.isSubstitution === value.isSubstitution
      && row.parent.id === value.compositions[0].shiftId; // because there's only one composition
  }

  getRow(rows: Row[], value: ScheduleRowValue): Row {
    return binarySearch(rows, ((mid) => {
      return this.compare(value, <ScheduleRowValue> mid.value);
    }));
  }

  getRowInsertIndex(rows: Row[], value: any): number {
    return binarySearchInsertIndex(rows, (mid => {
      return this.compare(value, <ScheduleRowValue> mid.value);
    }));
  }

  private compare(a: ScheduleRowValue, b: ScheduleRowValue) {
    return (a.position.uiPriority - b.position.uiPriority)
      || (b.position.id - a.position.id)
      || (b.employee.secondName.localeCompare(a.employee.secondName))
      || (b.employee.firstName.localeCompare(a.employee.firstName));
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
