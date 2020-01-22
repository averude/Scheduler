package com.averude.uksatse.scheduler.core.time;

import java.time.Duration;
import java.time.LocalTime;

public class DurationConverter {
    public static float toHoursFloatValue(LocalTime start,
                                          LocalTime end,
                                          LocalTime breakDuration) {
        float minutesBetween = Duration
                .between(start, end)
                .minusSeconds(breakDuration.toSecondOfDay())
                .toMinutes();

        return minutesBetween / 60;
    }
}
