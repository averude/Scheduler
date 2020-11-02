package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDayTypeIdAndTime;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "actual_day_type_id")
    private Long actualDayTypeId;

    @Positive(message = "{workDay.daytype.negative}")
    @Column(name = "scheduled_day_type_id")
    private Long scheduledDayTypeId;

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
        this.date = date;
    }

    public WorkDay(Long employeeId,
                   Long scheduledDayTypeId,
                   LocalDate date) {
        this.employeeId = employeeId;
        this.scheduledDayTypeId = scheduledDayTypeId;
        this.date = date;
    }

    public WorkDay(Long employeeId,
                   Long scheduledDayTypeId,
                   Integer startTime,
                   Integer breakStartTime,
                   Integer breakEndTime,
                   Integer endTime,
                   LocalDate date) {
        this.employeeId = employeeId;
        this.scheduledDayTypeId = scheduledDayTypeId;
        this.startTime = startTime;
        this.breakStartTime = breakStartTime;
        this.breakEndTime = breakEndTime;
        this.endTime = endTime;
        this.date = date;
    }

    @JsonIgnore
    @Override
    public Long getDayTypeId() {
        return actualDayTypeId != null ? actualDayTypeId : scheduledDayTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkDay workDay = (WorkDay) o;
        return employeeId.equals(workDay.employeeId) &&
                actualDayTypeId.equals(workDay.actualDayTypeId) &&
                scheduledDayTypeId.equals(workDay.scheduledDayTypeId) &&
                Objects.equals(startTime, workDay.startTime) &&
                Objects.equals(breakStartTime, workDay.breakStartTime) &&
                Objects.equals(breakEndTime, workDay.breakEndTime) &&
                Objects.equals(endTime, workDay.endTime) &&
                date.equals(workDay.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeId, actualDayTypeId, scheduledDayTypeId, startTime, breakStartTime, breakEndTime, endTime, date);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", WorkDay.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("employeeId=" + employeeId)
                .add("actualDayTypeId=" + actualDayTypeId)
                .add("scheduledDayTypeId=" + scheduledDayTypeId)
                .add("date=" + date)
                .add("startTime=" + startTime)
                .add("endTime=" + endTime)
                .add("breakStartTime=" + breakStartTime)
                .add("breakEndTime=" + breakEndTime)
                .toString();
    }
}
