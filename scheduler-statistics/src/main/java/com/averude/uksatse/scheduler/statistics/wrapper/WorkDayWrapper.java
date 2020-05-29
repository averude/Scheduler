package com.averude.uksatse.scheduler.statistics.wrapper;

import com.averude.uksatse.scheduler.core.entity.WorkDay;

import java.util.StringJoiner;

public class WorkDayWrapper {

    private final WorkDay workDay;
    private final int hash;

    public WorkDayWrapper(WorkDay workDay) {
        this.workDay = workDay;
        this.hash = workDay.getTimeHash();
    }

    public WorkDay getWorkDay() {
        return workDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkDayWrapper that = (WorkDayWrapper) o;
        return hash == that.hashCode();
    }

    @Override
    public int hashCode() {
        return hash;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", WorkDayWrapper.class.getSimpleName() + "[", "]")
                .add("workDay=" + workDay)
                .toString();
    }
}
