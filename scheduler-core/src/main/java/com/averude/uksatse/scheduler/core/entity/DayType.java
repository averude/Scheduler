package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
        name = "day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_types_unique_constraint",
                        columnNames = {"department_id", "name"}
                )
        }
)
public class DayType implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @NotNull
    @Column(name = "group_id", nullable = false)
    private Long dayTypeGroupId;

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

    @PositiveOrZero(message = "{workDay.hours.negative}")
    @DecimalMax(value = "24",
                message = "{workDay.hours.max}")
    @Column(name = "default_value")
    private Float defaultValue;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getDayTypeGroupId() {
        return dayTypeGroupId;
    }

    public void setDayTypeGroupId(Long dayTypeGroupId) {
        this.dayTypeGroupId = dayTypeGroupId;
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

    public void setLabel(String name) {
        this.label = name;
    }

    public Float getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(Float defaultValue) {
        this.defaultValue = defaultValue;
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
        return departmentId.equals(dayType.departmentId) &&
                dayTypeGroupId.equals(dayType.dayTypeGroupId) &&
                name.equals(dayType.name) &&
                Objects.equals(label, dayType.label) &&
                Objects.equals(defaultValue, dayType.defaultValue);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, dayTypeGroupId, name, label, defaultValue);
    }
}