package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

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
public class WorkingTime implements HasId {

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public Float getHours() {
        return hours;
    }

    public void setHours(Float hours) {
        this.hours = hours;
    }
}
