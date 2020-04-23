package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

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
public class DayType implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "enterprise_id", nullable = false)
    private Long enterpriseId;

//    @NotNull
//    @Column(name = "group_id", insertable = false, updatable = false)
//    private Long dayTypeGroupId;

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
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<WorkDay> workDays = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "dayType",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
    private List<DepartmentDayType> departmentDayTypes = new ArrayList<>();

    public DayType() {
    }

    public DayType(@NotNull(message = "{daytype.name.null}")
                   @Size(max = 128,
                         min = 1,
                         message = "{daytype.name.size}")
                   String name,
                   @Size(max = 5,
                         message = "{daytype.label.size}")
                   String label) {
        this.name = name;
        this.label = label;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Long getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(Long enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public DayTypeGroup getDayTypeGroup() {
        return dayTypeGroup;
    }

    public void setDayTypeGroup(DayTypeGroup dayTypeGroup) {
        this.dayTypeGroup = dayTypeGroup;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Boolean getUsePreviousValue() {
        return usePreviousValue;
    }

    public void setUsePreviousValue(Boolean usePreviousValue) {
        this.usePreviousValue = usePreviousValue;
    }

    public List<PatternUnit> getUnits() {
        return units;
    }

    public void setUnits(List<PatternUnit> units) {
        this.units = units;
    }

    public List<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<WorkDay> workDays) {
        this.workDays = workDays;
    }

    public List<DepartmentDayType> getDepartmentDayTypes() {
        return departmentDayTypes;
    }

    public void setDepartmentDayTypes(List<DepartmentDayType> departmentDayTypes) {
        this.departmentDayTypes = departmentDayTypes;
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
