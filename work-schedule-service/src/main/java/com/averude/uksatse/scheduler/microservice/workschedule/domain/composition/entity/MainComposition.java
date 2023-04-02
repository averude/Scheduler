package com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.Composition;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "main_compositions")
public class MainComposition implements HasId, Composition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "department_id")
    private Long departmentId;

    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;

    @NotNull
    @Column(name = "employee_id")
    private Long employeeId;

    @NotNull
    @Column(name = "position_id")
    private Long positionId;

    @NotNull
    @Column(name = "from_date")
    private LocalDate from;

    @NotNull
    @Column(name = "to_date")
    private LocalDate to;

    @JsonIgnore
    @OneToMany( mappedBy = "mainComposition",
                cascade = {CascadeType.PERSIST, CascadeType.MERGE},
                fetch = FetchType.LAZY)
    private List<SubstitutionComposition> substitutionCompositions;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MainComposition that = (MainComposition) o;
        return shiftId.equals(that.shiftId) &&
                employeeId.equals(that.employeeId) &&
                from.equals(that.from) &&
                to.equals(that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shiftId, employeeId, from, to);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", MainComposition.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("shiftId=" + shiftId)
                .add("employeeId=" + employeeId)
                .add("from=" + from)
                .add("to=" + to)
                .toString();
    }
}
