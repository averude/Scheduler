import { Row } from "./row";
import { removeFromArray } from "../../../../services/utils";
import { TableData } from "./table";

export class RowGroup {
  parent: TableData;
  id:     number;
  value:  any;
  rows:   Row[];

  decideMergeFn: (row: Row, value: any) => boolean;
  getExistingRowFn: (rows: Row[], value) => Row = (arr) => arr[arr.length - 1];
  findInsertIndexFn: (rows: Row[], value) => number;

  constructor() {
    this.rows = [];
  }

  addOrMerge<T>(id: number,
                value: T,
                mergeFn: (row: Row) => void) {
    const existingRow = this.getExistingRowFn(this.rows, value);

    if (existingRow && this.decideMergeFn(existingRow, value)) {
      mergeFn(existingRow);
      return existingRow;
    } else {
      const row = new Row();
      row.parent = this;
      row.id = id;
      row.value = value;
      row.cells = [];
      row.rows = [];
      const idx = this.findInsertIndexFn(this.rows, value);
      this.rows.splice(idx, 0, row);
      return row;
    }

  }

  findRows(comparatorFn: (row: Row) => boolean): Row[] {
    return this.rows.filter(comparatorFn);
  }

  removeRows(comparatorFn: (row: Row) => boolean) {
    removeFromArray(this.rows, comparatorFn);
  }
}
