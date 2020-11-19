package com.averude.uksatse.scheduler.generator.model;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDateDuration;
import lombok.Data;

import java.time.LocalDate;
import java.util.stream.Stream;

@Data
public class GenerationInterval<T> implements HasDateDuration {

    private LocalDate from;
    private LocalDate to;
    private T object;
    private long offset;

    public GenerationInterval() {
    }

    public GenerationInterval(LocalDate from, LocalDate to, long offset) {
        this.from = from;
        this.to = to;
        this.offset = offset;
    }

    public Stream<LocalDate> datesBetween() {
        return from.datesUntil(to.plusDays(1L));
    }
}
