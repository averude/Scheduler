import { Moment } from "moment";
import { binarySearch } from "../../../../shared/utils/collection-utils";
import { ScheduleRow, ScheduleRowGroup } from "../../../../model/ui/schedule-table/table-data";
import { SortingStrategy } from "./sorting-strategy";
import { binarySearchInsertIndex } from "../../utils/collection-utils";

export class TableData {

  private _groups: ScheduleRowGroup[];
  from: Moment;
  to: Moment;
  sortingStrategy: SortingStrategy<ScheduleRowGroup>;

  constructor() {
    this._groups = [];
  }

  set groups(value: ScheduleRowGroup[]) {
    this._groups = value;
  }

  get groups(): ScheduleRowGroup[] {
    if (this.sortingStrategy) {
      return this.sortingStrategy.sort(this._groups);
    } else {
      return this._groups;
    }
  }

  addGroup(group: ScheduleRowGroup,
           comparator: (group: ScheduleRowGroup) => number) {
    const insertIndex = binarySearchInsertIndex(this._groups, comparator);
    if (insertIndex >= 0) {
      this._groups.splice(insertIndex, 0, group);
    } else {
      this._groups.push(group);
    }
  }

  findRowGroup(groupId: number): ScheduleRowGroup {
    return binarySearch(this._groups, (mid => mid.id - groupId));
  }

  forEachRowInGroup(groupId: number, callbackfn: (row: ScheduleRow) => void) {
    this.findRowGroup(groupId).rows.forEach(callbackfn);
  }

  forEachRow(callbackfn: (row: ScheduleRow) => void) {
    this._groups.forEach((group => group.rows.forEach(callbackfn)));
  }

  forEachRowWithId(rowId: number,
                   fn: (row) => void) {
    this._groups.forEach(group => {
      group.findRows(row => row.id === rowId).forEach(fn);
    });
  }
}
