import { Row } from "./row";
import { removeFromArray } from "../../../../services/utils";
import { TableData } from "./table";

export interface TableSortingStrategy {

  decideMerge(row: Row, value: any): boolean;
  getRow(rows: Row[], value: any): Row;
  getRowGroup(groups: RowGroup[], value: any): RowGroup;
  getRowInsertIndex(rows: Row[], value: any): number;
  getRowGroupInsertIndex(groups: RowGroup[], value: any): number;

}

export class RowGroup {
  parent: TableData;
  id:     number;
  value:  any;
  rows:   Row[];

  constructor() {
    this.rows = [];
  }

  addOrMerge<T>(id: number,
                value: T,
                mergeFn: (row: Row) => void) {
    const sortingStrategy = this.parent.sortingStrategy;

    const existingRow = sortingStrategy.getRow(this.rows, value);

    if (existingRow && sortingStrategy.decideMerge(existingRow, value)) {
      mergeFn(existingRow);
      return existingRow;
    } else {
      const row = new Row();
      row.parent = this;
      row.id = id;
      row.value = value;
      row.cells = [];
      row.rows = [];
      const idx = sortingStrategy.getRowInsertIndex(this.rows, value);
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
