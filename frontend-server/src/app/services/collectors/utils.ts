import { Composition } from "../../model/composition";
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { ScheduleRowValue } from "../../model/ui/schedule-table/table-data";
import { binarySearch, binarySearchInsertIndex } from "../../lib/ngx-schedule-table/utils/collection-utils";

export function exchangeComposition(compositions: Composition[],
                                    newComposition: Composition) {
  const oldCompositionIndex = compositions.findIndex(composition => composition.id === newComposition.id);
  if (oldCompositionIndex >= 0) {
    compositions.splice(oldCompositionIndex, 1, newComposition);
  } else {
    compositions.push(newComposition);
    compositions.sort((a,b) => a.from.diff(b.from));
  }
}

export const CALENDAR_MERGE_DECISION_FN = ((row: Row, value: ScheduleRowValue) => {
  const oldValue = <ScheduleRowValue> row.value;

  return oldValue.position.id === value.position.id
    && oldValue.employee.id === value.employee.id
    && oldValue.isSubstitution === value.isSubstitution
    && row.parent.id === value.compositions[0].shiftId; // because there's only one composition
});

export const CALENDAR_EXISTING_ROW_GETTER = ((rows: Row[],
                                              value: ScheduleRowValue) => {
  return binarySearch(rows, ((mid) => {
    const rowVal = <ScheduleRowValue> mid.value;

    return (rowVal.position.id - value.position.id)
      || (rowVal.employee.secondName.localeCompare(value.employee.secondName))
      || (rowVal.employee.firstName.localeCompare(value.employee.firstName));
  }));
});

export const CALENDAR_INSERT_INDEX_FINDER = ((rows: Row[],
                                              value: ScheduleRowValue) => {
  return binarySearchInsertIndex(rows, (mid => {
    const rowVal = <ScheduleRowValue> mid.value;

    return (rowVal.position.id - value.position.id)
      || (rowVal.employee.secondName.localeCompare(value.employee.secondName))
      || (rowVal.employee.firstName.localeCompare(value.employee.firstName));
  }));
});
