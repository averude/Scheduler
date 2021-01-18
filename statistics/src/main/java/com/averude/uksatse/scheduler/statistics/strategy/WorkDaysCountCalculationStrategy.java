package com.averude.uksatse.scheduler.statistics.strategy;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDayTypeId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTime;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTimeDuration;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.BiFunction;

import static com.averude.uksatse.scheduler.core.model.entity.SummationColumnType.COUNT;
import static com.averude.uksatse.scheduler.core.util.CollectionUtils.binarySearch;

@Component
public class WorkDaysCountCalculationStrategy implements CalculationStrategy {

    @Override
    public <T extends HasDayTypeId & HasTime, U extends HasDayTypeId & HasTimeDuration>
    long getSum(T hasTime,
                List<U> ranges,
                BiFunction<T, U, Long> comparator) {
        var count = 0;

        if (ranges == null || ranges.isEmpty()) {
            count++;
        } else {
            int index = binarySearch(ranges, (mid) -> mid.getDayTypeId() - hasTime.getDayTypeId());
            if (index >= 0) {
                count++;
            }
        }

        return count;
    }

    @Override
    public String getName() {
        return COUNT;
    }
}
