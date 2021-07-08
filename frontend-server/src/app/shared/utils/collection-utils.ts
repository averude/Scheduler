import { IdEntity } from "../../model/interface/id-entity";
import { BasicDTO } from "../../model/dto/basic-dto";
import { MainComposition } from "../../model/composition";

export function binarySearch<T>(arr: T[],
                                comparator_fn: (mid: T) => number): T {
  if (!arr) {
    return;
  }

  let result = -1;

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (comparator_fn(arr[mid]) === 0) {
      result = mid;
      break;
    }
    if (comparator_fn(arr[mid]) > 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return result >= 0 ? arr[result] : undefined;
}

export function bsr<T>(arr: T[],
                       binary_comp: (mid: T) => number,
                       lin_comp: (mid: T) => boolean) {

  let result = binarySearchIndex(arr, binary_comp, 0, arr.length - 1);

  if (result >= 0) {

    let i = result;
    while (i < arr.length - 1) {

      const b_comp_res = binary_comp(arr[i]) == 0;
      const lin_comp_res = lin_comp(arr[i]);

      if (b_comp_res && lin_comp_res) {
        return i;
      } else if (!b_comp_res) {
        break;
      } else {
        i++;
      }

    }

    i = result;
    while (i >= 0) {

      const b_comp_res = binary_comp(arr[i]) == 0;
      const lin_comp_res = lin_comp(arr[i]);

      if (b_comp_res && lin_comp_res) {
        return i;
      } else if (!b_comp_res) {
        break;
      } else {
        i--;
      }
    }

  }

  return result;
}

export function binarySearchLastRepeatableIndex<T>(arr: T[],
                                                   binary_comparator_fn: (mid: T) => number,
                                                   linear_comparator_fn: (value: T) => number) {
  if (!arr) {
    return;
  }

  let result = -1;

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (binary_comparator_fn(arr[mid]) === 0) {
      result = mid;

      const lastIndex = lastIndexOfRepeatable(arr, linear_comparator_fn, mid);
      if (lastIndex > mid) {
        result = lastIndex;
      }

      break;
    }
    if (binary_comparator_fn(arr[mid]) > 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return result;
}

export function lastIndexOfRepeatable<T>(arr: T[],
                                         comparator_fn: (value) => number,
                                         start_idx?: number) {
  let result: number = start_idx;

  for (let i = start_idx; i < arr.length; i++) {
    if (comparator_fn(arr[i]) == 0) {
      result = i;
    } else {
      break;
    }
  }

  return result;
}

export function binarySearchIndex<T>(arr: T[],
                                     comparator_fn: (mid: T) => number,
                                     start_idx: number,
                                     end_idx: number): number {
  if (!arr || !comparator_fn || start_idx > end_idx) {
    return;
  }

  let result = -1;

  let start = start_idx > 0 ? start_idx : 0;
  let end = end_idx < arr.length - 1 ? end_idx : arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (comparator_fn(arr[mid]) === 0) {
      result = mid;
      break;
    }
    if (comparator_fn(arr[mid]) > 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return result;
}

export function binarySearchInsertIndex<T>(arr: T[],
                                           comparator_fn: (mid: T) => number,
                                           start_index?: number,
                                           end_index?:number): number {
  if (!arr || !comparator_fn) {
    return;
  }

  if (arr.length === 0) {
    return 0;
  }

  let start = 0;
  let end = arr.length - 1;

  if (start_index >= 0 && end_index > start_index && end_index < arr.length) {
    start = start_index;
    end = end_index;
  }

  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (comparator_fn(arr[mid]) === 0) {
      return -1;
    }

    if (comparator_fn(arr[mid]) > 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  let result = comparator_fn(arr[mid]) > 0 ? mid : mid + 1;

  return result;
}

export function uniqById<T>(arr: T[],
                            fn: (element: T) => number): T[] {
  const seen = {};
  const out = [];
  const len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const value = arr[i];
    const id = fn(value);
    if (seen[id] !== 1) {
      seen[id] = 1;
      out[j++] = value;
    }
  }
  return out;
}

export function sortByPattern<T1, T2>(arr: T1[],
                                      pattern: T2[],
                                      fn: (arrayElement: T1, patternElement: T2) => boolean) {
  for (let idx = 0; idx < pattern.length; idx++) {
    const patternElement = pattern[idx];

    for (let arr_idx = idx; arr_idx < arr.length; arr_idx++) {
      const arrElement = arr[arr_idx];

      if (fn(arrElement, patternElement)) {
        if (arr_idx === idx) {
          break;
        }

        const prevVal = arr[idx];
        arr[idx] = arrElement;
        arr[arr_idx] = prevVal;
        break;
      }
    }
  }

  if (pattern.length < arr.length) {
    arr.splice(pattern.length);
  }
}

export function sortByCompositions<T extends IdEntity>(dtos: BasicDTO<T, any>[],
                                                       compositions: MainComposition[]) {
  const employeeMainShiftCompositions = uniqById(
    compositions
      .sort((a, b) => a.shiftId - b.shiftId),
    (element => element.employeeId)
  );
  sortByPattern(dtos, employeeMainShiftCompositions,
    ((arrayElement, patternElement) => arrayElement.parent.id === patternElement.employeeId));
}
