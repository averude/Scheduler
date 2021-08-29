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
