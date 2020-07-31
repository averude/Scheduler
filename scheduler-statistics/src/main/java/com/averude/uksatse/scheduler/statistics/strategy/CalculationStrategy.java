package com.averude.uksatse.scheduler.statistics.strategy;

import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;

import java.util.Map;
import java.util.stream.Stream;

public interface CalculationStrategy {
    long calculate(Stream<Map.Entry<WorkDayWrapper, Integer>> entryStream, SummationColumn column);
    String getName();
}
