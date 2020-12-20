package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
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
@NamedEntityGraph(
        name = "graph.ShiftPattern.departmentDayTypes",
        attributeNodes = {
                @NamedAttributeNode(
                        value = "holidayDepDayType",
                        subgraph = "graph.ShiftPattern.DepartmentDayType.dayType"),
                @NamedAttributeNode(
                        value = "extraWeekendDepDayType",
                        subgraph = "graph.ShiftPattern.DepartmentDayType.dayType"),
                @NamedAttributeNode(
                        value = "extraWorkDayDepDayType",
                        subgraph = "graph.ShiftPattern.DepartmentDayType.dayType"),
        },
        subgraphs = {
                @NamedSubgraph(
                        name = "graph.ShiftPattern.DepartmentDayType.dayType",
                        attributeNodes = @NamedAttributeNode(
                                value = "dayType",
                                subgraph = "graph.ShiftPattern.DepartmentDayType.DayType.dayTypeGroup")),
                @NamedSubgraph(
                        name = "graph.ShiftPattern.DepartmentDayType.DayType.dayTypeGroup",
                        attributeNodes = @NamedAttributeNode("dayTypeGroup")
                )
        }
)
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

    @ManyToOne
    @JoinColumn(name = "holiday_dep_day_type_id")
    private DepartmentDayType holidayDepDayType;

    @ManyToOne
    @JoinColumn(name = "extra_weekend_dep_day_type_id")
    private DepartmentDayType extraWeekendDepDayType;

    @ManyToOne
    @JoinColumn(name = "extra_work_day_dep_day_type_id")
    private DepartmentDayType extraWorkDayDepDayType;

    @JsonIgnore
    @OneToMany( mappedBy = "patternId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    @OrderBy("orderId ASC")
    private List<PatternUnit> sequence;

    @JsonIgnore
    @OneToMany(mappedBy = "shiftPattern")
    private List<Shift> shifts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShiftPattern that = (ShiftPattern) o;
        return departmentId.equals(that.departmentId) &&
                name.equals(that.name) &&
                Objects.equals(holidayDepDayType, that.holidayDepDayType) &&
                Objects.equals(extraWeekendDepDayType, that.extraWeekendDepDayType) &&
                Objects.equals(extraWorkDayDepDayType, that.extraWorkDayDepDayType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, name, holidayDepDayType, extraWeekendDepDayType, extraWorkDayDepDayType);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ShiftPattern.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("name='" + name + "'")
                .add("holidayDepDayType=" + holidayDepDayType)
                .add("extraWeekendDepDayType=" + extraWeekendDepDayType)
                .add("extraWorkDayDepDayType=" + extraWorkDayDepDayType)
                .toString();
    }
}
