import { Row } from "./row";
import { binarySearchInsertIndex, bsr } from "../../utils/collection-utils";
import { removeFromArray } from "../../../../services/utils";

export class RowGroup {
  id:     number;
  name:   string;
  value:  any;
  rows:   Row[];

  constructor() {
    this.rows = [];
  }

  addRow<T extends Row>(row: T,
                        comparator: (val: T) => number) {
    if (!this.rows) {
      return;
    }

    // TODO: change implementation of bs. Include repeatable values case
    const insertIndex = binarySearchInsertIndex(this.rows, comparator);
    if (insertIndex >= 0) {
      this.rows.splice(insertIndex, 0, row);
    } else {
      this.rows.push(row);
    }
  }

  init<T extends Row>(isUpdateOperationPredicate: (row: T) => boolean,
                      updateRowFn: (row: T) => T,
                      createRowFn: () => T) {
    let result;

    const rowData = <T[]> this.rows;
    const lastRow = rowData[rowData.length - 1];

    if (isUpdateOperationPredicate(lastRow)) {
      result = updateRowFn(lastRow);
    } else {
      result = createRowFn();
      rowData.push(result);
    }

    return result;
  }

  createOrUpdateRow<T extends Row>(b_comparator: (val: T) => number,
                                   l_comparator: (val: T) => boolean,
                                   isUpdateOperationPredicate: (row: T) => boolean,
                                   updateRowFn: (row: T) => T,
                                   createRowFn: () => T) {

    let processedRow;

    const rowIndex = bsr(this.rows, b_comparator, l_comparator);
    if (rowIndex >= 0) {

      const row = <T> this.rows[rowIndex];
      if (isUpdateOperationPredicate(row)) {
        processedRow = updateRowFn(row);
      } else {
        const newRow = createRowFn();
        this.rows.splice(rowIndex + 1, 0, newRow);
        processedRow = newRow;
      }

    } else {
      const newRow = createRowFn();
      this.addRow(newRow, b_comparator);
      processedRow = newRow;
    }

    return processedRow;
  }

  findRows(comparatorFn: (row: Row) => boolean): Row[] {
    return this.rows.filter(comparatorFn);
  }

  removeRows(comparatorFn: (row: Row) => boolean) {
    removeFromArray(this.rows, comparatorFn);
  }
}
