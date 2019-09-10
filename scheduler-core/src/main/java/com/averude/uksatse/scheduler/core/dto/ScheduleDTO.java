package com.averude.uksatse.scheduler.core.dto;

import com.averude.uksatse.scheduler.core.entity.WorkDay;

public class ScheduleDTO {

    private Long employeeId;
    private Iterable<WorkDay> workDays;

    public ScheduleDTO() {}

    public ScheduleDTO(Long employeeId, Iterable<WorkDay> workDays) {
        this.employeeId = employeeId;
        this.workDays = workDays;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Iterable<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(Iterable<WorkDay> workDays) {
        this.workDays = workDays;
    }
}
