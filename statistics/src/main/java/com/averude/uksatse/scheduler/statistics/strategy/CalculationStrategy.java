package com.averude.uksatse.scheduler.statistics.strategy;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDayTypeId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTime;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTimeDuration;

import java.util.List;
import java.util.function.BiFunction;

public interface CalculationStrategy {

    <T extends HasDayTypeId & HasTime, U extends HasDayTypeId & HasTimeDuration>
    long getSum(T hasTime,
                List<U> ranges,
                BiFunction<T, U, Long> comparator);

    String getName();
}
