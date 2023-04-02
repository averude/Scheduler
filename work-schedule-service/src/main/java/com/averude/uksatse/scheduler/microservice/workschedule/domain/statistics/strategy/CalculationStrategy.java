package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy;

import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDayTypeId;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasTime;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasTimeDuration;

import java.util.List;

public interface CalculationStrategy {

    <T extends HasDayTypeId & HasTime, U extends HasDayTypeId & HasTimeDuration>
    long getSum(T hasTime, List<U> ranges);

    String getName();
}
