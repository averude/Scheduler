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
                                           end_index?: number): number {
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
