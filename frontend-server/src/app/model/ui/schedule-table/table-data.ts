import { Composition } from "../../composition";
import { Employee } from "../../employee";
import { Position } from "../../position";
import { Moment } from "moment";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { binarySearch, binarySearchIndex, binarySearchInsertIndex } from "../../../shared/utils/collection-utils";
import { RowInterval } from "./row-interval";

export class TableData {
  groups: ScheduleRowGroup[];
  from:   Moment;
  to:     Moment;

  constructor() {
    this.groups = [];
  }

  addRowGroup(group: ScheduleRowGroup) {
    if (!this.groups) {
      return;
    }

    const insertIndex = binarySearchInsertIndex(this.groups, 'id', group.id);
    if (insertIndex > 0) {
      this.groups.splice(insertIndex, 0, group);
    }
  }

  findRowGroup(groupId: number): ScheduleRowGroup {
    return binarySearch(this.groups, (mid => mid.id - groupId));
  }

  findRow(group_id: number, row_id: number): ScheduleRow {
    return this.findRowGroup(group_id)?.findRow(row_id);
  }

  findRows(id: number): ScheduleRow[] {
    const result: ScheduleRow[] = [];
    this.groups.forEach(group => {
      const row = group.findRow(id);
      if (row) {
        result.push(row);
      }
    });
    return result;
  }

  removeRowGroups(ids: number[]) {
    ids?.forEach(id => this.removeRowGroup(id));
  }

  removeRowGroup(id: number) {
    if (!this.groups) {
      return;
    }

    const removeIndex = binarySearchIndex(this.groups, 'id', id);
    if (removeIndex > 0) {
      this.groups.splice(removeIndex, 1);
    }
  }

  removeRow(id: number) {
    if (!this.groups) {
      return;
    }

    this.findRows(id).forEach(row => row.group.removeRow(id));
  }
}

export class ScheduleRowGroup implements RowGroup {
  table:  TableData;
  id:     number;
  name:   string;
  rows:   Row[];

  addRows(rows: ScheduleRow[]) {
    if (!rows) {
      return;
    }

    rows.forEach(row => this.addRow(row));
  }

  addRow(row: ScheduleRow) {
    if (!this.rows) {
      return;
    }

    const insertIndex = binarySearchInsertIndex(this.rows, 'id', row.id);
    if (insertIndex >= 0) {
      row.group = this;
      this.rows.splice(insertIndex, 0, row);
    } else {
      throw new Error(`Row id: ${row.id} already exists`);
    }
  }

  addRowOrElse(row: ScheduleRow, fn: (row: Row) => void) {
    if (!this.rows) {
      return;
    }

    const insertIndex = binarySearchInsertIndex(this.rows, 'id', row.id);
    if (insertIndex >= 0) {
      row.group = this;
      this.rows.splice(insertIndex, 0, row);
    } else {
      const rowIndex = binarySearchIndex(this.rows, 'id', row.id);
      fn(this.rows[rowIndex]);
    }
  }

  findRow(id: number): ScheduleRow {
    if (this.rows) {
      return <ScheduleRow> binarySearch(this.rows, (mid => mid.id - id));
    }
  }

  removeRow(id: number) {
    if (!this.rows) {
      return;
    }

    const removeIndex = binarySearchIndex(this.rows, 'id', id);
    if (removeIndex >= 0) {
      this.rows.splice(removeIndex, 1);
    }
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
