package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.json.deserializer.StringToIntTimeDeserializer;
import com.averude.uksatse.scheduler.core.json.serializer.IntToStringTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Table(
        name = "department_day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "department_day_types_unique_constraint",
                        columnNames = {"department_id", "day_type_id"}
                )
        }
)
public class DepartmentDayType implements HasId, HasTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "day_type_id", nullable = false)
    private DayType dayType;

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

    @JsonIgnore
    @OneToMany( mappedBy = "holidayDepDayType")
    private List<ShiftPattern> patternsWithHolidays = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "extraWeekendDepDayType")
    private List<ShiftPattern> patternsWithExtraWeekends = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "extraWorkDayDepDayType")
    private List<ShiftPattern> patternsWithExtraWorkDays = new ArrayList<>();

    public DepartmentDayType() {
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public DayType getDayType() {
        return dayType;
    }

    public void setDayType(DayType dayType) {
        this.dayType = dayType;
    }

    @Override
    public Integer getStartTime() {
        return startTime;
    }

    @Override
    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    @Override
    public Integer getBreakStartTime() {
        return breakStartTime;
    }

    @Override
    public void setBreakStartTime(Integer breakStartTime) {
        this.breakStartTime = breakStartTime;
    }

    @Override
    public Integer getBreakEndTime() {
        return breakEndTime;
    }

    @Override
    public void setBreakEndTime(Integer breakEndTime) {
        this.breakEndTime = breakEndTime;
    }

    @Override
    public Integer getEndTime() {
        return endTime;
    }

    @Override
    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }

    public List<ShiftPattern> getPatternsWithHolidays() {
        return patternsWithHolidays;
    }

    public void setPatternsWithHolidays(List<ShiftPattern> patternsWithHolidays) {
        this.patternsWithHolidays = patternsWithHolidays;
    }

    public List<ShiftPattern> getPatternsWithExtraWeekends() {
        return patternsWithExtraWeekends;
    }

    public void setPatternsWithExtraWeekends(List<ShiftPattern> patternsWithExtraWeekends) {
        this.patternsWithExtraWeekends = patternsWithExtraWeekends;
    }

    public List<ShiftPattern> getPatternsWithExtraWorkDays() {
        return patternsWithExtraWorkDays;
    }

    public void setPatternsWithExtraWorkDays(List<ShiftPattern> patternsWithExtraWorkDays) {
        this.patternsWithExtraWorkDays = patternsWithExtraWorkDays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DepartmentDayType that = (DepartmentDayType) o;
        return departmentId.equals(that.departmentId) &&
                dayType.equals(that.dayType) &&
                Objects.equals(startTime, that.startTime) &&
                Objects.equals(breakStartTime, that.breakStartTime) &&
                Objects.equals(breakEndTime, that.breakEndTime) &&
                Objects.equals(endTime, that.endTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, dayType, startTime, breakStartTime, breakEndTime, endTime);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", DepartmentDayType.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("dayType=" + dayType)
                .add("startTime=" + startTime)
                .add("breakStartTime=" + breakStartTime)
                .add("breakEndTime=" + breakEndTime)
                .add("endTime=" + endTime)
                .toString();
    }
}
