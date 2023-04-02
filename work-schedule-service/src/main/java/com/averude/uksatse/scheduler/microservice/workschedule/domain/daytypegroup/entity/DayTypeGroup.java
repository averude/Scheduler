package com.averude.uksatse.scheduler.microservice.workschedule.domain.daytypegroup.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "day_type_groups",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_type_groups_unique_constraint",
                        columnNames = {"name"}
                )
        }
)
public class DayTypeGroup implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false)
    private String color;

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeGroup",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<DayType> dayTypes = new LinkedList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DayTypeGroup that = (DayTypeGroup) o;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", DayTypeGroup.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("color='" + color + "'")
                .toString();
    }
}
