import { Composition } from "../../composition";
import { Employee } from "../../employee";
import { Position } from "../../position";
import { Moment } from "moment";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import {
  binarySearch,
  binarySearchInsertIndex,
  binarySearchLastRepeatableIndex
} from "../../../shared/utils/collection-utils";
import { RowInterval } from "./row-interval";

export class TableData {
  groups: ScheduleRowGroup[];
  from:   Moment;
  to:     Moment;

  constructor() {
    this.groups = [];
  }

  findRowGroup(groupId: number): ScheduleRowGroup {
    return binarySearch(this.groups, (mid => mid.id - groupId));
  }
}

export class ScheduleRowGroup implements RowGroup {
  table:  TableData;
  id:     number;
  name:   string;
  rows:   Row[];

  constructor() {
    this.rows = [];
  }

  addRow(row: ScheduleRow,
         comparator: (val: ScheduleRow) => number) {
    if (!this.rows) {
      return;
    }

    const insertIndex = binarySearchInsertIndex(this.rows, comparator);
    if (insertIndex >= 0) {
      row.group = this;
      this.rows.splice(insertIndex, 0, row);
    } else {
      this.rows.push(row);
    }
  }

  foo(comparator: (val: ScheduleRow) => number,
      isUpdateOperationPredicate: (row: ScheduleRow) => boolean,
      updateRowFn: (row) => ScheduleRow,
      createRowFn: () => ScheduleRow) {

    let processedRow;

    const rowIndex = binarySearchLastRepeatableIndex(this.rows, comparator, comparator);
    if (rowIndex >= 0) {

      const row = <ScheduleRow> this.rows[rowIndex];
      if (isUpdateOperationPredicate(row)) {

        processedRow = updateRowFn(row);

      } else {

        const newRow = createRowFn();
        this.rows.splice(rowIndex + 1, 0, newRow);
        processedRow = newRow;

      }

    } else {

      const newRow = createRowFn();
      this.addRow(newRow, comparator);
      processedRow = newRow;

    }

    return processedRow;
  }
}

export interface ScheduleRow extends Row {
  group:          ScheduleRowGroup;
  id:             number;
  employee:       Employee;
  position:       Position;
  compositions:   Composition[];
  isSubstitution: boolean;
  cells:          Cell[];
  workingNorm:    number;
  intervals?:     RowInterval[];
}

export interface ScheduleCell extends Cell {
  row:      ScheduleRow;
  value:    any;
  date:     any;
  enabled:  boolean;
}
