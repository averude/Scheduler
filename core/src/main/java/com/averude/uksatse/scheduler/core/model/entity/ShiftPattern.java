package com.averude.uksatse.scheduler.core.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "shift_patterns",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "shift_patterns_unique_constraint",
                        columnNames = {"department_id", "name"}
                )
        }
)
@NamedEntityGraphs({
        @NamedEntityGraph(
                name = "graph.ShiftPattern.sequence",
                attributeNodes = {
                        @NamedAttributeNode(
                                value = "sequence",
                                subgraph = "graph.ShiftPattern.HasDayType.dayType"),
                },
                subgraphs = {
                        @NamedSubgraph(
                                name = "graph.ShiftPattern.Rules.departmentDayType",
                                attributeNodes = @NamedAttributeNode(
                                        value = "useDepartmentDayType",
                                        subgraph = "graph.ShiftPattern.HasDayType.dayType"
                                )
                        ),
                        @NamedSubgraph(
                                name = "graph.ShiftPattern.HasDayType.dayType",
                                attributeNodes = @NamedAttributeNode(
                                        value = "dayType",
                                        subgraph = "graph.ShiftPattern.HasDayType.DayType.dayTypeGroup")),
                        @NamedSubgraph(
                                name = "graph.ShiftPattern.HasDayType.DayType.dayTypeGroup",
                                attributeNodes = @NamedAttributeNode("dayTypeGroup")
                        )
                }
        )
})
public class ShiftPattern implements HasId, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @JsonIgnore
    @NotNull(message = "{shiftpattern.department.null}")
    @Positive(message = "{shiftpattern.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @NotNull(message = "{shiftpattern.name.null}")
    @Size(  max = 128,
            min = 3,
            message = "{shiftpattern.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "patternId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    @OrderBy("orderId ASC")
    private List<PatternUnit> sequence;

    @JsonIgnore
    @OneToMany( mappedBy = "shiftPatternId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    @OrderBy("orderId ASC")
    private List<ShiftPatternGenerationRule> shiftPatternGenerationRules;

    @JsonIgnore
    @OneToMany(mappedBy = "shiftPatternId")
    private List<Shift> shifts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShiftPattern that = (ShiftPattern) o;
        return departmentId.equals(that.departmentId) &&
                name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ShiftPattern.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("name='" + name + "'")
                .toString();
    }
}
