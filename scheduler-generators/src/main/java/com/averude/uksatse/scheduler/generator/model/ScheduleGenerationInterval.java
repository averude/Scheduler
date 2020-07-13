package com.averude.uksatse.scheduler.generator.model;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDateDuration;

import java.time.LocalDate;
import java.util.Objects;

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

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public long getOffset() {
        return offset;
    }

    public void setOffset(long offset) {
        this.offset = offset;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScheduleGenerationInterval that = (ScheduleGenerationInterval) o;
        return employeeId == that.employeeId &&
                offset == that.offset &&
                Objects.equals(from, that.from) &&
                Objects.equals(to, that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(from, to, employeeId, offset);
    }

    @Override
    public String toString() {
        return "{" +
                "from=" + from +
                ", to=" + to +
                ", employeeId=" + employeeId +
                ", offset=" + offset +
                '}';
    }
}
