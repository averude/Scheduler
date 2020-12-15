import { MainShiftComposition, SubstitutionShiftComposition } from "../../main-shift-composition";
import { Employee } from "../../employee";
import { Moment } from "moment";
import { CellData } from "../../../lib/ngx-schedule-table/model/data/cell-data";
import { RowData } from "../../../lib/ngx-schedule-table/model/data/row-data";
import { RowGroupData } from "../../../lib/ngx-schedule-table/model/data/row-group-data";
import { binarySearchIndex, binarySearchInsertIndex, bs } from "../../../shared/utils/collection-utils";

export class TableData {
  groups: RowGroup[];
  from:   Moment;
  to:     Moment;

  constructor() {
    this.groups = [];
  }

  addRowGroup(group: RowGroup) {
    if (!this.groups) {
      return;
    }

    const insertIndex = binarySearchInsertIndex(this.groups, 'id', group.id);
    if (insertIndex > 0) {
      this.groups.splice(insertIndex, 0, group);
    }
  }

  findRowGroup(groupId: number): RowGroup {
    return bs(this.groups, 'id', groupId);
  }

  findRow(group_id: number, row_id: number): Row {
    return this.findRowGroup(group_id)?.findRow(row_id);
  }

  findRows(id: number): Row[] {
    const result: Row[] = [];
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

export class RowGroup implements RowGroupData {
  table:  TableData;
  id:     number;
  name:   string;
  rows:   RowData[];

  addRows(rows: Row[]) {
    if (!rows) {
      return;
    }

    rows.forEach(row => this.addRow(row));
  }

  addRow(row: Row) {
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

  findRow(id: number): Row {
    if (this.rows) {
      return bs(this.rows, 'id', id);
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

export interface Row extends RowData {
  group:        RowGroup;
  id:           number;
  employee:     Employee;
  composition:  MainShiftComposition | SubstitutionShiftComposition;
  isSubstitution: boolean;
  cellData:     CellData[];
  workingNorm:  number;
}

export interface Cell extends CellData {
  row:      Row;
  value:    any;
  date:     any;
  enabled:  boolean;
}
