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
      return mid;
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
