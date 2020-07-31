package com.averude.uksatse.scheduler.statistics.strategy;

import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.stream.Stream;

@Component
public class WorkDaysCountCalculationStrategy implements CalculationStrategy {

    @Override
    public long calculate(Stream<Map.Entry<WorkDayWrapper, Integer>> entryStream, SummationColumn column) {
        return entryStream.mapToLong(Map.Entry::getValue).sum();
    }

    @Override
    public String getName() {
        return "count";
    }
}
