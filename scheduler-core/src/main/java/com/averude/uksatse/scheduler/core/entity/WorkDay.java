package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Table(
        name = "work_schedule",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "schedule_unique_constraint",
                        columnNames = {"employee_id", "date"})
        }
)
public class WorkDay implements HasId, HasTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{workDay.employee.null}")
    @Positive(message = "{workDay.employee.negative}")
    @Column(name = "employee_id",
            nullable = false)
    private Long employeeId;

    @Positive(message = "{workDay.daytype.negative}")
    @Column(name = "day_type_id")
    private Long dayTypeId;

    @NotNull(message = "{workDay.isholiday.null}")
    @Column(nullable = false)
    private Boolean holiday;

    @Column(name = "start_time")
    private Integer startTime;

    @Column(name = "break_start_time")
    private Integer breakStartTime;

    @Column(name = "break_end_time")
    private Integer breakEndTime;

    @Column(name = "end_time")
    private Integer endTime;

    @NotNull(message = "{workDay.date.null}")
    @Column(nullable = false)
    private LocalDate date;

    public WorkDay() {
    }

    public WorkDay(Long employeeId, LocalDate date) {
        this.employeeId = employeeId;
        this.holiday = false;
        this.date = date;
    }

    public WorkDay(Long employeeId,
                   Long dayTypeId,
                   Boolean holiday,
                   LocalDate date) {
        this.employeeId = employeeId;
        this.dayTypeId = dayTypeId;
        this.holiday = holiday;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getDayTypeId() {
        return dayTypeId;
    }

    public void setDayTypeId(Long dayTypeId) {
        this.dayTypeId = dayTypeId;
    }

    public Boolean getHoliday() {
        return holiday;
    }

    public void setHoliday(Boolean holiday) {
        this.holiday = holiday;
    }

    public Integer getStartTime() {
        return startTime;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    public Integer getBreakStartTime() {
        return breakStartTime;
    }

    public void setBreakStartTime(Integer breakStartTime) {
        this.breakStartTime = breakStartTime;
    }

    public Integer getBreakEndTime() {
        return breakEndTime;
    }

    public void setBreakEndTime(Integer breakEndTime) {
        this.breakEndTime = breakEndTime;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkDay workDay = (WorkDay) o;
        return employeeId.equals(workDay.employeeId) &&
                dayTypeId.equals(workDay.dayTypeId) &&
                holiday.equals(workDay.holiday) &&
                Objects.equals(startTime, workDay.startTime) &&
                Objects.equals(breakStartTime, workDay.breakStartTime) &&
                Objects.equals(breakEndTime, workDay.breakEndTime) &&
                Objects.equals(endTime, workDay.endTime) &&
                date.equals(workDay.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeId, dayTypeId, holiday, startTime, breakStartTime, breakEndTime, endTime, date);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", WorkDay.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("employeeId=" + employeeId)
                .add("dayTypeId=" + dayTypeId)
                .add("holiday=" + holiday)
                .add("date=" + date)
                .add("startTime=" + startTime)
                .add("endTime=" + endTime)
                .add("breakStartTime=" + breakStartTime)
                .add("breakEndTime=" + breakEndTime)
                .toString();
    }
}
