package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.json.deserializer.StringToIntTimeDeserializer;
import com.averude.uksatse.scheduler.core.json.serializer.IntToStringTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import javax.validation.constraints.*;
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

    @JsonSerialize(using = IntToStringTimeSerializer.class)
    @JsonDeserialize(using = StringToIntTimeDeserializer.class)
    @Column(name = "start_time")
    private Integer startTime;

    @JsonSerialize(using = IntToStringTimeSerializer.class)
    @JsonDeserialize(using = StringToIntTimeDeserializer.class)
    @Column(name = "break_start_time")
    private Integer breakStartTime;

    @JsonSerialize(using = IntToStringTimeSerializer.class)
    @JsonDeserialize(using = StringToIntTimeDeserializer.class)
    @Column(name = "break_end_time")
    private Integer breakEndTime;

    @JsonSerialize(using = IntToStringTimeSerializer.class)
    @JsonDeserialize(using = StringToIntTimeDeserializer.class)
    @Column(name = "end_time")
    private Integer endTime;

    @NotNull
    @Column(name = "use_previous_value")
    private Boolean usePreviousValue;

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

    public Integer getStartTime() {
        return startTime;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    public Integer getBreakStartTime() {
        return breakStartTime;
    }

    public void setBreakStartTime(Integer breakStartTime) {
        this.breakStartTime = breakStartTime;
    }

    public Integer getBreakEndTime() {
        return breakEndTime;
    }

    public void setBreakEndTime(Integer breakEndTime) {
        this.breakEndTime = breakEndTime;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
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
                Objects.equals(startTime, dayType.startTime) &&
                Objects.equals(breakStartTime, dayType.breakStartTime) &&
                Objects.equals(breakEndTime, dayType.breakEndTime) &&
                Objects.equals(endTime, dayType.endTime) &&
                usePreviousValue.equals(dayType.usePreviousValue);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, dayTypeGroupId, name, label,
                startTime, breakStartTime, breakEndTime, endTime, usePreviousValue);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", DayType.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("dayTypeGroupId=" + dayTypeGroupId)
                .add("name='" + name + "'")
                .add("label='" + label + "'")
                .add("startTime=" + startTime)
                .add("breakStartTime=" + breakStartTime)
                .add("breakEndTime=" + breakEndTime)
                .add("endTime=" + endTime)
                .add("usePreviousValue=" + usePreviousValue)
                .toString();
    }
}
