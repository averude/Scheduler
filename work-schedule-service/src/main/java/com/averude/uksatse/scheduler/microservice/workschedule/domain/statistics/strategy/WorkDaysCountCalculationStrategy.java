package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy;

import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDayTypeId;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasTime;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasTimeDuration;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.averude.uksatse.scheduler.core.util.CollectionUtils.binarySearch;
import static com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumnType.COUNT;

@Component
public class WorkDaysCountCalculationStrategy implements CalculationStrategy {

    @Override
    public <T extends HasDayTypeId & HasTime, U extends HasDayTypeId & HasTimeDuration>
    long getSum(T hasTime, List<U> ranges) {
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
