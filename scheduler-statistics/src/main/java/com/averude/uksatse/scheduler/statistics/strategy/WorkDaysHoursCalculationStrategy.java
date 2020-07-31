package com.averude.uksatse.scheduler.statistics.strategy;

import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.util.TimeCalculator;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.stream.Stream;

@Component
public class WorkDaysHoursCalculationStrategy implements CalculationStrategy {

    private TimeCalculator timeCalculator;

    @Autowired
    public WorkDaysHoursCalculationStrategy(TimeCalculator timeCalculator) {
        this.timeCalculator = timeCalculator;
    }

    @Override
    public long calculate(Stream<Map.Entry<WorkDayWrapper, Integer>> entryStream, SummationColumn column) {
        return entryStream.mapToLong(entry -> getWorkDayLength(entry.getKey().getWorkDay(), column) * entry.getValue())
                .sum();
    }

    private int getWorkDayLength(WorkDay workDay, SummationColumn summationColumn) {
        if (summationColumn.getDayTypeRanges() == null || summationColumn.getDayTypeRanges().isEmpty()) {
            return timeCalculator.getLength(workDay, null);
        } else {
            return summationColumn.getDayTypeRanges()
                    .stream()
                    .filter(range -> range.getDayTypeId().equals(workDay.getDayTypeId()))
                    .findFirst()
                    .map(range -> timeCalculator.getLength(workDay, range))
                    .orElse(0);
        }
    }

    @Override
    public String getName() {
        return "hours_sum";
    }
}
