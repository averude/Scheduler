package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDayTypeId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTime;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTimeDuration;

import java.util.List;

public interface CalculationStrategy {

    <T extends HasDayTypeId & HasTime, U extends HasDayTypeId & HasTimeDuration>
    long getSum(T hasTime, List<U> ranges);

    String getName();
}
