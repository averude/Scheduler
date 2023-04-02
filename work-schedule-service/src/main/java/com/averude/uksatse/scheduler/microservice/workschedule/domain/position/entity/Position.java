package com.averude.uksatse.scheduler.microservice.workschedule.domain.position.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasUiPriority;
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
        name = "positions",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "positions_unique_constraint",
                        columnNames = {"name", "department_id"})
        }
)
public class Position implements HasId, HasDepartmentId, HasUiPriority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{position.name.null}")
    @Size(  max = 256,
            min = 3,
            message = "{position.name.size}")
    @Column(nullable = false)
    private String name;

    @Size(  max = 64,
            min = 1,
            message = "{position.name.size}")
    @Column(name = "short_name")
    private String shortName;

    @NotNull(message = "{position.department.null}")
    @Positive(message = "{position.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @Column(name = "ui_priority")
    private Long uiPriority;

    public Position(@NotNull(message = "{position.name.null}")
                    @Size(max = 256,
                          min = 3,
                          message = "{position.name.size}")
                    String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Position position = (Position) o;
        return Objects.equals(id, position.id) &&
                Objects.equals(name, position.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Position.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("shortName='" + shortName + "'")
                .add("departmentId=" + departmentId)
                .toString();
    }
}
