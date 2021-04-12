package com.averude.uksatse.scheduler.core.util;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.function.BiPredicate;
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

    public static <T, U> boolean containsAll(Collection<T> tArr,
                                             Collection<U> uArr,
                                             BiPredicate<T, U> equalsPredicate) {
        if (invalidCollection(uArr) || invalidCollection(tArr)) {
            return false;
        }

        var result = true;

        var stack = new LinkedList<>(uArr);

        outLoop:
        for (var t : tArr) {
            var iterator = stack.iterator();
            while (iterator.hasNext()) {
                var u = iterator.next();
                if (equalsPredicate.test(t, u)) {
                    iterator.remove();
                    continue outLoop;
                }
            }

            result = false;
            break;
        }

        return result;
    }

    private static boolean invalidCollection(Collection collection) {
        return collection == null || collection.isEmpty();
    }
}
