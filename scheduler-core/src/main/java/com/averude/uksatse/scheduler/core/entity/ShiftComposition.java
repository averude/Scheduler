package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDateDuration;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

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
@Table(name = "shift_composition")
public class ShiftComposition implements HasId, HasDateDuration {
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
    @Type(type = "numeric_boolean")
    @Column(nullable = false)
    private Boolean substitution;

    @NotNull
    @Column(name = "from_date")
    private LocalDate from;

    @NotNull
    @Column(name = "to_date")
    private LocalDate to;

    public ShiftComposition(Shift shift, Employee employee) {
        this.shiftId = shift.getId();
        this.employee = employee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShiftComposition that = (ShiftComposition) o;
        return shiftId.equals(that.shiftId) &&
                employee.equals(that.employee) &&
                substitution.equals(that.substitution) &&
                from.equals(that.from) &&
                to.equals(that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shiftId, employee, substitution, from, to);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ShiftComposition.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("shiftId=" + shiftId)
                .add("employee=" + employee)
                .add("substitution=" + substitution)
                .add("from=" + from)
                .add("to=" + to)
                .toString();
    }
}
