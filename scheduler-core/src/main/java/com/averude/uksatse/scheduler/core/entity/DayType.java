package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
        name = "day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_types_unique_constraint",
                        columnNames = {"label", "name"}
                )
        }
)
public class DayType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{daytype.name.null}")
    @Size(  max = 64,
            min = 1,
            message = "{daytype.name.size}")
    @Column(nullable = false)
    private String name;

    @Size(  max = 5,
            message = "{daytype.label.size}")
    @Column(nullable = true)
    private String label;

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                orphanRemoval = true,
                cascade = CascadeType.ALL)
    private List<PatternUnit> units = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                orphanRemoval = true,
                cascade = CascadeType.ALL)
    private List<WorkDay> workDays = new ArrayList<>();

    public DayType() {
    }

    public DayType(@NotNull(message = "{daytype.name.null}")
                   @Size(max = 64,
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
        return name.equals(dayType.name) &&
                label.equals(dayType.label);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, label);
    }
}