package com.averude.uksatse.scheduler.generator.model;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDateDuration;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ScheduleGenerationInterval implements HasDateDuration {

    private LocalDate from;
    private LocalDate to;
    private long employeeId;
    private long offset;

    public ScheduleGenerationInterval() {
    }

    public ScheduleGenerationInterval(LocalDate from, LocalDate to, long offset) {
        this.from = from;
        this.to = to;
        this.offset = offset;
    }
}
