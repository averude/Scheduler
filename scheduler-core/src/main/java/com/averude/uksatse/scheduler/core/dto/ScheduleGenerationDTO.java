package com.averude.uksatse.scheduler.core.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

public class ScheduleGenerationDTO {
    @NotNull
    private Long shiftId;
    @NotNull
    @PositiveOrZero
    private int offset;
    @NotNull
    private LocalDate from;
    @NotNull
    private LocalDate to;

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }

    @Override
    public String toString() {
        return "{" +
                "shiftId=" + shiftId +
                ", offset=" + offset +
                ", from=" + from +
                ", to=" + to +
                '}';
    }
}
