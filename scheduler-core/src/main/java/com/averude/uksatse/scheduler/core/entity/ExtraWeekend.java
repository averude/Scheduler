package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Table(name = "extra_weekends")
public class ExtraWeekend implements HasId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "holiday_id")
    private Long holidayId;

    @Column
    private LocalDate date;

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

    public Long getHolidayId() {
        return holidayId;
    }

    public void setHolidayId(Long holidayId) {
        this.holidayId = holidayId;
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
        ExtraWeekend that = (ExtraWeekend) o;
        return departmentId.equals(that.departmentId) &&
                Objects.equals(holidayId, that.holidayId) &&
                date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, holidayId, date);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ExtraWeekend.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("holidayId=" + holidayId)
                .add("date=" + date)
                .toString();
    }
}
