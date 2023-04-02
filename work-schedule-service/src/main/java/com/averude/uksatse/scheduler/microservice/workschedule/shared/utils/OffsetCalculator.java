package com.averude.uksatse.scheduler.microservice.workschedule.shared.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class OffsetCalculator {

    public long recalculateForDate(LocalDate from,
                                   LocalDate date,
                                   int unitsSize,
                                   int offset) {
        long daysBetween = Math.abs(from.until(date, ChronoUnit.DAYS));
        return (daysBetween + offset) % unitsSize;
    }
}
