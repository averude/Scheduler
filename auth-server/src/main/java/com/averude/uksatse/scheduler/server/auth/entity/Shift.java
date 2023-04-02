package com.averude.uksatse.scheduler.server.auth.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "shifts",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "shifts_unique_constraint",
                        columnNames = {"department_id", "name"})
        }
)
public class Shift implements HasId, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{shift.name.null}")
    @Size(  max = 128,
            min = 2,
            message = "{shift.name.size}")
    @Column(nullable = false)
    private String name;

    @Positive(message = "{shift.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @Column(name = "pattern_id")
    private Long shiftPatternId;

    @NotNull
    private Boolean hidden;

    @Column(name = "ui_priority")
    private Long uiPriority;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shift shift = (Shift) o;
        return Objects.equals(id, shift.id) &&
                Objects.equals(name, shift.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Shift.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("departmentId=" + departmentId)
                .add("shiftPatternId=" + shiftPatternId)
                .toString();
    }
}
