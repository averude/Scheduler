package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDayTypeId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTime;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTimeDuration;
import com.averude.uksatse.scheduler.core.util.TimeCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.averude.uksatse.scheduler.core.model.entity.SummationColumnType.HOURS_SUM;
import static com.averude.uksatse.scheduler.core.util.CollectionUtils.binarySearch;
import static com.averude.uksatse.scheduler.core.util.CollectionUtils.findMatches;

@Component
@RequiredArgsConstructor
public class WorkDaysHoursCalculationStrategy implements CalculationStrategy {

    private final TimeCalculator timeCalculator;

    @Override
    public <T extends HasDayTypeId & HasTime, U extends HasDayTypeId & HasTimeDuration>
    long getSum(T hasTime, List<U> ranges) {
        var sum = 0;

        if (ranges == null || ranges.isEmpty()) {
            sum = timeCalculator.getLength(hasTime, null);
        } else {
            int index = binarySearch(ranges, (mid) -> mid.getDayTypeId() - hasTime.getDayTypeId());

            if (index >= 0) {

                int[] matchIndexes = findMatches(index, ranges, (mid) -> mid.getDayTypeId() - hasTime.getDayTypeId());

                if (matchIndexes != null) {
                    for (int i = matchIndexes[0]; i <= matchIndexes[1]; i++) {
                        sum += timeCalculator.getLength(hasTime, ranges.get(i));
                    }
                }

            }
        }

        return sum;
    }

    @Override
    public String getName() {
        return HOURS_SUM;
    }
}
