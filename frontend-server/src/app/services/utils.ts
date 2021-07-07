import { EmployeeScheduleDTO } from "../model/dto/employee-schedule-dto";

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
