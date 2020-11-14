package com.averude.uksatse.scheduler.core.util;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasTime;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasTimeDuration;

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
