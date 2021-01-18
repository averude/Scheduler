package com.averude.uksatse.scheduler.core.util;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class CollectionUtils {

    public static <T> int binarySearch(List<T> list,
                                       Function<T, Long> comparator) {
        int low = 0;
        int high = list.size()-1;

        while (low <= high) {
            int mid = (low + high) >>> 1;
            T midVal = list.get(mid);
            long cmp = comparator.apply(midVal);

            if (cmp < 0)
                low = mid + 1;
            else if (cmp > 0)
                high = mid - 1;
            else
                return mid;
        }
        return -(low + 1);
    }

    public static <T> int[] findMatches(int matchIndex,
                                        List<T> list,
                                        Function<T, Long> comparator) {
        if (matchIndex < 0) {
            return null;
        }

        int firstMatchIndex = matchIndex, lastMatchIndex = matchIndex;

        while (firstMatchIndex - 1 > list.size() && comparator.apply(list.get(firstMatchIndex - 1)) == 0) {
            firstMatchIndex--;
        }

        while (lastMatchIndex + 1 < list.size() && comparator.apply(list.get(lastMatchIndex + 1)) == 0) {
            lastMatchIndex++;
        }

        return new int[]{firstMatchIndex, lastMatchIndex};
    }

    public static <T> void forEachMatched(int matchIndex,
                                          List<T> list,
                                          Function<T, Long> comparator,
                                          Consumer<T> consumer) {
        if (matchIndex < 0) {
            return;
        }

        int firstMatchIndex = matchIndex, lastMatchIndex = matchIndex;

        while (firstMatchIndex - 1 > list.size() && comparator.apply(list.get(firstMatchIndex - 1)) == 0) {
            consumer.accept(list.get(--firstMatchIndex));
        }

        while (lastMatchIndex + 1 < list.size() && comparator.apply(list.get(lastMatchIndex + 1)) == 0) {
            consumer.accept(list.get(++lastMatchIndex));
        }
    }
}
