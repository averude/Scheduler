package com.averude.uksatse.scheduler.generator.model;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDateDuration;
import lombok.Data;

import java.time.LocalDate;
import java.util.stream.Stream;

@Data
public class ScheduleGenerationInterval implements HasDateDuration {

    private LocalDate from;
    private LocalDate to;
    private Employee employee;
    private long offset;

    public ScheduleGenerationInterval() {
    }

    public ScheduleGenerationInterval(LocalDate from, LocalDate to, long offset) {
        this.from = from;
        this.to = to;
        this.offset = offset;
    }

    public Stream<LocalDate> datesBetween() {
        return from.datesUntil(to.plusDays(1L));
    }
}
