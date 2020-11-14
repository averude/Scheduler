package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_types_unique_constraint",
                        columnNames = {"enterprise_id", "name"}
                )
        }
)
public class DayType implements HasId, HasEnterpriseId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @JsonIgnore
    @NotNull
    @Column(name = "enterprise_id", nullable = false)
    private Long enterpriseId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private DayTypeGroup dayTypeGroup;

    @NotNull(message = "{daytype.name.null}")
    @Size(  max = 128,
            min = 1,
            message = "{daytype.name.size}")
    @Column(nullable = false)
    private String name;

    @Size(  max = 5,
            message = "{daytype.label.size}")
    @Column(nullable = true)
    private String label;

    @NotNull
    @Column(name = "use_previous_value")
    private Boolean usePreviousValue = false;

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<PatternUnit> units = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "actualDayTypeId",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<WorkDay> actualWorkDays = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "scheduledDayTypeId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<WorkDay> scheduledWorkDays = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "dayType",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<DepartmentDayType> departmentDayTypes = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<SummationColumnDayTypeRange> summationColumns;

    public DayType(String name,
                   String label) {
        this.name = name;
        this.label = label;
    }

    public void addPatternUnit(PatternUnit unit) {
        unit.setDayTypeId(this.getId());
        units.add(unit);
    }

    public void removePatternUnit(PatternUnit unit) {
        unit.setDayTypeId(null);
        units.remove(unit);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DayType dayType = (DayType) o;
        return enterpriseId.equals(dayType.enterpriseId) &&
                dayTypeGroup.equals(dayType.dayTypeGroup) &&
                name.equals(dayType.name) &&
                Objects.equals(label, dayType.label) &&
                usePreviousValue.equals(dayType.usePreviousValue);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enterpriseId, dayTypeGroup, name, label, usePreviousValue);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", DayType.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("dayTypeGroup=" + dayTypeGroup)
                .add("name='" + name + "'")
                .add("label='" + label + "'")
                .add("usePreviousValue=" + usePreviousValue)
                .toString();
    }
}
