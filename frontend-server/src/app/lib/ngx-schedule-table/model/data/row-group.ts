import { Row } from "./row";
import { binarySearchInsertIndex, binarySearchLastRepeatableIndex } from "../../../../shared/utils/collection-utils";

export class RowGroup {
  id:   number;
  name: string;
  rows: Row[];

  constructor() {
    this.rows = [];
  }

  addRow<T extends Row>(row: T,
                        comparator: (val: T) => number) {
    if (!this.rows) {
      return;
    }

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

  createOrUpdateRow<T extends Row>(comparator: (val: T) => number,
                                   isUpdateOperationPredicate: (row: T) => boolean,
                                   updateRowFn: (row: T) => T,
                                   createRowFn: () => T) {

    let processedRow;

    const rowIndex = binarySearchLastRepeatableIndex(this.rows, comparator, comparator);
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
      this.addRow(newRow, comparator);
      processedRow = newRow;
    }

    return processedRow;
  }

  findRows(rowId: number): Row[] {
    return this.rows.filter(row => row.id === rowId);
  }
}
