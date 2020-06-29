package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDayTypeIdAndTime;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "work_schedule",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "schedule_unique_constraint",
                        columnNames = {"employee_id", "date"})
        }
)
public class WorkDay implements HasId, HasDayTypeIdAndTime, HasDate {

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

    public WorkDay(Long employeeId,
                   Long dayTypeId,
                   Boolean holiday,
                   Integer startTime,
                   Integer breakStartTime,
                   Integer breakEndTime,
                   Integer endTime,
                   LocalDate date) {
        this.employeeId = employeeId;
        this.dayTypeId = dayTypeId;
        this.holiday = holiday;
        this.startTime = startTime;
        this.breakStartTime = breakStartTime;
        this.breakEndTime = breakEndTime;
        this.endTime = endTime;
        this.date = date;
    }

    public int getTimeHash() {
        return Objects.hash(dayTypeId, holiday, startTime, breakStartTime, breakEndTime, endTime);
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
