package com.averude.uksatse.scheduler.core.util;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDateDuration;

import java.time.LocalDate;

public class IntervalUtils {
    public static boolean isBetween(LocalDate date, HasDateDuration interval) {
        return !date.isBefore(interval.getFrom()) && !date.isAfter(interval.getTo());
    }

    public static boolean isBetween(HasDateDuration a, HasDateDuration b) {
        return isBetween(a.getFrom(), b) && isBetween(a.getTo(), b);
    }

    public static boolean intersection(HasDateDuration a, HasDateDuration b) {
        return isBetween(a.getFrom(), b) || isBetween(a.getTo(), b);
    }
}
