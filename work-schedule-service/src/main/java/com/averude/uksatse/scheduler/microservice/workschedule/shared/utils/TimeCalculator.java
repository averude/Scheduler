package com.averude.uksatse.scheduler.microservice.workschedule.shared.utils;

import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasTime;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasTimeDuration;

import java.time.LocalDate;
import java.util.List;

public interface TimeCalculator {
    float calculateHours(int offset,
                         List<? extends HasTime> hasTimeList,
                         LocalDate startOfMonth);

    long calculateDays(int offset,
                       List<? extends HasTime> hasTimeList,
                       LocalDate startOfMonth);

    Integer getLength(HasTime hasTime, HasTimeDuration hasTimeDuration);
}
