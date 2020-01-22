package com.averude.uksatse.scheduler.core.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@Entity()
@Table(name = "shift_composition")
public class ShiftComposition implements HasId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;

    @NotNull
    @Column(name = "employee_id")
    private Long employeeId;

    @NotNull
    @Type(type = "numeric_boolean")
    @Column(nullable = false)
    private Boolean substitution;

    @NotNull
    @Column(name = "from_date")
    private LocalDate from;

    @NotNull
    @Column(name = "to_date")
    private LocalDate to;

    public ShiftComposition() {}

    public ShiftComposition(Shift shift, Employee employee) {
        this.shiftId = shift.getId();
        this.employeeId = employee.getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Boolean getSubstitution() {
        return substitution;
    }

    public void setSubstitution(Boolean substitution) {
        this.substitution = substitution;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShiftComposition that = (ShiftComposition) o;
        return shiftId.equals(that.shiftId) &&
                employeeId.equals(that.employeeId) &&
                substitution.equals(that.substitution) &&
                from.equals(that.from) &&
                to.equals(that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shiftId, employeeId, substitution, from, to);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", "{", "}")
                .add("id=" + id)
                .add("shiftId=" + shiftId)
                .add("employeeId=" + employeeId)
                .add("substitution=" + substitution)
                .add("from=" + from)
                .add("to=" + to)
                .toString();
    }
}
