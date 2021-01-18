package com.averude.uksatse.scheduler.core.model.wrapper;

import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;
import java.util.StringJoiner;

public class WorkDayWrapper {
    @Getter
    private final WorkDay workDay;

    @Setter
    @Getter
    private String specialDateType;

    public WorkDayWrapper(WorkDay workDay, String specialDateType) {
        this.workDay = workDay;
        this.specialDateType = specialDateType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkDayWrapper that = (WorkDayWrapper) o;
        return this.hashCode() == that.hashCode();
    }

    @Override
    public int hashCode() {
        return Objects.hash(workDay.getActualDayTypeId(), workDay.getScheduledDayTypeId(), workDay.getStartTime(), workDay.getEndTime(),
                workDay.getBreakStartTime(), workDay.getBreakEndTime(), specialDateType);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", WorkDayWrapper.class.getSimpleName() + "[", "]")
                .add("workDay=" + workDay)
                .add("specialDateType=" + specialDateType)
                .toString();
    }
}
