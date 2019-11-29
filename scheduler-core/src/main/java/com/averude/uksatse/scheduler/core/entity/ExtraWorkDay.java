package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Table(name = "extra_work_days")
public class ExtraWorkDay implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @Column(name = "extra_weekend_id", nullable = false)
    private Long extraWeekendId;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getExtraWeekendId() {
        return extraWeekendId;
    }

    public void setExtraWeekendId(Long extraWeekendId) {
        this.extraWeekendId = extraWeekendId;
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
        ExtraWorkDay that = (ExtraWorkDay) o;
        return departmentId.equals(that.departmentId) &&
                Objects.equals(extraWeekendId, that.extraWeekendId) &&
                date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, extraWeekendId, date);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("extraWeekendId=" + extraWeekendId)
                .add("date=" + date)
                .toString();
    }
}
