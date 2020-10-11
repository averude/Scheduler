package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDepartmentId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "working_time",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "working_time_unique_constraint",
                        columnNames = {"date", "shift_id"}
                )
        }
)
public class WorkingTime implements HasId, HasDepartmentId, HasDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @NotNull
    @Column(name = "shift_id",
            nullable = false)
    private Long shiftId;

    @NotNull
    @Column(nullable = false)
    private LocalDate date; // year and month

    @NotNull
    @Column(nullable = false)
    private Float hours;

    @NotNull
    private Long days;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkingTime that = (WorkingTime) o;
        return departmentId.equals(that.departmentId) &&
                shiftId.equals(that.shiftId) &&
                date.equals(that.date) &&
                hours.equals(that.hours) &&
                days.equals(that.days);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, shiftId, date, hours, days);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", WorkingTime.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("shiftId=" + shiftId)
                .add("date=" + date)
                .add("hours=" + hours)
                .add("days=" + days)
                .toString();
    }
}
