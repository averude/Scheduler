import { EmployeeScheduleDTO } from "../model/dto/employee-schedule-dto";
import { Composition } from "../model/composition";

export function getMainShiftId(dto: EmployeeScheduleDTO) {

  if (dto.mainCompositions.length > 0) {
    return findMax(dto.mainCompositions, (prev, curr) => prev.from.isBefore(curr.from)).shiftId;
  } else {
    if (dto.substitutionCompositions.length > 0) {
      return findMax(dto.substitutionCompositions, (prev, curr) => prev.from.isBefore(curr.from)).shiftId;
    }
  }
}

export function findMax<T>(arr: T[],
                           comparator: (prev: T, curr: T) => boolean): T {
  if (arr.length == 0) {
    return undefined;
  }

  let maxVal = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];
    if (comparator(maxVal, val)) {
      maxVal = val;
    }
  }

  return maxVal;
}

export function putSorted<T extends Composition>(composition: T, compositions: T[]) {
  compositions.push(composition);
  compositions.sort((a, b) => (a.shiftId - b.shiftId) + (a.from.diff(b.from)));
}

export function removeFromArray<T>(arr: T[], comparator: (value: T) => boolean) {
  const compositionIndex = arr.findIndex(comparator);
  arr.splice(compositionIndex, 1);
}
