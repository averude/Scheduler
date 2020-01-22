package com.averude.uksatse.scheduler.generator.model;

import com.averude.uksatse.scheduler.core.entity.WorkDay;

import java.util.List;

public class EmployeeReportData {
    private String employeeName;
    private String employeePosition;
    private List<WorkDay> employeeSchedule;

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }

    public List<WorkDay> getEmployeeSchedule() {
        return employeeSchedule;
    }

    public void setEmployeeSchedule(List<WorkDay> employeeSchedule) {
        this.employeeSchedule = employeeSchedule;
    }
}
