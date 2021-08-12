import { Moment } from "moment";
import { binarySearch } from "../../../../shared/utils/collection-utils";
import { SortingStrategy } from "./sorting-strategy";
import { binarySearchInsertIndex } from "../../utils/collection-utils";
import { RowGroup } from "./row-group";
import { Row } from "./row";

export class TableData {

  private _groups: RowGroup[];

  from: Moment;
  to:   Moment;
  sortingStrategy: SortingStrategy<RowGroup>;

  constructor() {
    this._groups = [];
  }

  set groups(value: RowGroup[]) {
    this._groups = value;
  }

  get groups(): RowGroup[] {
    if (this.sortingStrategy) {
      return this.sortingStrategy.sort(this._groups);
    } else {
      return this._groups;
    }
  }

  addGroup(group: RowGroup,
           comparator?: (group: RowGroup) => number) {
    if (comparator) {
      const insertIndex = binarySearchInsertIndex(this._groups, comparator);
      if (insertIndex >= 0) {
        this._groups.splice(insertIndex, 0, group);
        return;
      }
    }

    this._groups.push(group);
  }

  findRowGroup(groupId: number): RowGroup {
    return binarySearch(this._groups, (mid => mid.id - groupId));
  }

  forEachRowInGroup(groupId: number, callbackfn: (row: Row) => void) {
    this.findRowGroup(groupId).rows.forEach(callbackfn);
  }

  forEachRow(callbackfn: (row: Row) => void) {
    this._groups.forEach((group => group.rows.forEach(callbackfn)));
  }

  forEachRowWithId(rowId: number,
                   fn: (row) => void) {
    this._groups.forEach(group => {
      group.findRows(row => row.id === rowId).forEach(fn);
    });
  }
}
