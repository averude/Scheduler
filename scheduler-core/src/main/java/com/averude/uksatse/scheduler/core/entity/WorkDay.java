package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(
        name = "work_schedule",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "schedule_unique_constraint",
                        columnNames = {"employee_id", "date"})
        }
)
public class WorkDay implements HasId {

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

    @NotNull(message = "{workDay.hours.null}")
    @PositiveOrZero(message = "{workDay.hours.negative}")
    @DecimalMax(value = "24",
                message = "{workDay.hours.max}")
    @Column(nullable = false)
    private Float hours;

    @NotNull(message = "{workDay.date.null}")
    @Column(nullable = false)
    private LocalDate date;

    public WorkDay() {
    }

    public WorkDay(Long employeeId,
                   Long dayTypeId,
                   Boolean holiday,
                   Float hours,
                   LocalDate date) {
        this.employeeId = employeeId;
        this.dayTypeId = dayTypeId;
        this.holiday = holiday;
        this.hours = hours;
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

    public Float getHours() {
        return hours;
    }

    public void setHours(Float hours) {
        this.hours = hours;
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
        return Objects.equals(id, workDay.id) &&
                Objects.equals(employeeId, workDay.employeeId) &&
                Objects.equals(holiday, workDay.holiday) &&
                Objects.equals(hours, workDay.hours) &&
                Objects.equals(date, workDay.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, employeeId, holiday, hours, date);
    }

    @Override
    public String toString() {
        return "["
                + "ID: " + id + "; "
                + "Employee ID: " + employeeId + "; "
                + "Day Type ID:" + dayTypeId + "; "
                + "Holiday: " + holiday + "; "
                + "Hours: " + hours + "; "
                + "Date: " + date +
                "]";
    }
}
