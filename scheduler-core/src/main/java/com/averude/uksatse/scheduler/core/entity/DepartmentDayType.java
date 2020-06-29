package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDayTypeIdAndTime;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDepartmentId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.averude.uksatse.scheduler.core.json.deserializer.StringToIntTimeDeserializer;
import com.averude.uksatse.scheduler.core.json.serializer.IntToStringTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
public class DepartmentDayType implements HasId, HasDayTypeIdAndTime, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @JsonIgnore
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
    private List<ShiftPattern> patternsWithHolidays;

    @JsonIgnore
    @OneToMany( mappedBy = "extraWeekendDepDayType")
    private List<ShiftPattern> patternsWithExtraWeekends;

    @JsonIgnore
    @OneToMany( mappedBy = "extraWorkDayDepDayType")
    private List<ShiftPattern> patternsWithExtraWorkDays;

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
    public Long getDayTypeId() {
        return dayType.getId();
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
