import { Moment } from "moment";
import { binarySearch, binarySearchInsertIndex } from "../../utils/collection-utils";
import { SortingStrategy } from "./sorting-strategy";
import { RowGroup } from "./row-group";
import { Row } from "./row";
import { FilteringStrategy } from "./filtering-strategy";
import { Filterable } from "./filterable";

export class TableData implements Filterable {

  private _groups: RowGroup[];

  headerData: any[];
  from: Moment;
  to:   Moment;

  sortingStrategy: SortingStrategy<RowGroup>;
  filteringStrategy: FilteringStrategy;

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
    group.parent = this;

    if (comparator) {
      const insertIndex = binarySearchInsertIndex(this._groups, comparator);
      if (insertIndex >= 0) {
        this._groups.splice(insertIndex, 0, group);
        return;
      }
    }

    this._groups.push(group);
  }

  addOrMergeRow<T>(groupId: number,
                   rowId: number,
                   value: T,
                   mergeFn: (row: Row) => void): Row {
    const rowGroup = this.findRowGroup(groupId);
    if (!rowGroup) {
      throw new Error(`No row group with id:${groupId} found`);
    }

    return rowGroup.addOrMerge(rowId, value, mergeFn);
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
                   callbackfn: (row) => void) {
    this._groups.forEach(group => {
      group.findRows(row => row.id === rowId).forEach(callbackfn);
    });
  }

  filter(value: string) {
    this.filteringStrategy?.filter(this, value);
  }

  clearFilter() {
    this.filteringStrategy?.clear(this);
  }
}
