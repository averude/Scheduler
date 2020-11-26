package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.interfaces.entity.EntityComposition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
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
@Entity()
@Table(name = "main_shift_compositions")
public class MainShiftComposition implements HasId, EntityComposition<Long, Employee> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @NotNull
    @Column(name = "from_date")
    private LocalDate from;

    @NotNull
    @Column(name = "to_date")
    private LocalDate to;

    public MainShiftComposition(Shift shift, Employee employee) {
        this.shiftId = shift.getId();
        this.employee = employee;
    }

    @Override
    @JsonIgnore
    public Long getSideA() {
        return shiftId;
    }

    @Override
    @JsonIgnore
    public Employee getSideB() {
        return employee;
    }

    @Override
    public void setSideA(Long shiftId) {
        this.shiftId = shiftId;
    }

    @Override
    public void setSideB(Employee employee) {
        this.employee = employee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MainShiftComposition that = (MainShiftComposition) o;
        return shiftId.equals(that.shiftId) &&
                employee.equals(that.employee) &&
                from.equals(that.from) &&
                to.equals(that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shiftId, employee, from, to);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", MainShiftComposition.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("shiftId=" + shiftId)
                .add("employee=" + employee)
                .add("from=" + from)
                .add("to=" + to)
                .toString();
    }
}
