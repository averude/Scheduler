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

export const MERGE_DECISION_FN = ((row: Row, value: ScheduleRowValue) => {
  const oldValue = <ScheduleRowValue>row.value;

  return oldValue.position.id === value.position.id
    && oldValue.employee.id === value.employee.id
    && oldValue.isSubstitution === value.isSubstitution
    && row.parent.id === value.compositions[0].shiftId; // because there's only one composition
});

export const EXISTING_ROW_GETTER = ((rows: Row[],
                                     value: ScheduleRowValue) => {
  return binarySearch(rows, ((mid) => {
    const rowVal = <ScheduleRowValue>mid.value;
    let number = rowVal.position.id - value.position.id;

    if (number === 0) {
      const empVal = (rowVal).employee;
      number = empVal.secondName.localeCompare(value.employee.secondName);
      if (number === 0) {
        number = empVal.firstName.localeCompare(value.employee.firstName);
      }
    }

    return number;
  }));

});

export const INSERT_INDEX_FINDER = ((rows: Row[],
                                     value: ScheduleRowValue) => {
  return binarySearchInsertIndex(rows, (mid => {
    const rowVal = <ScheduleRowValue>mid.value;
    let number = rowVal.position.id - value.position.id;

    if (number === 0) {
      const empVal = (rowVal).employee;
      number = empVal.secondName.localeCompare(value.employee.secondName);
      if (number === 0) {
        number = empVal.firstName.localeCompare(value.employee.firstName);
        if (number === 0) {
          return rowVal.isSubstitution === value.isSubstitution ? 0 : 1;
        }
      }
    }

    return number;
  }))
});
