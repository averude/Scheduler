package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.json.deserializer.StringToIntTimeDeserializer;
import com.averude.uksatse.scheduler.core.json.serializer.IntToStringTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Table(
        name = "pattern_units",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "pattern_token_unique_constraint",
                        columnNames = {"pattern_id","order_id"}
                )
        }
)
public class PatternUnit implements HasId, HasTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{unit.pattern.null}")
    @Positive(message = "{unit.pattern.negative}")
    @Column(name = "pattern_id",
            nullable = false)
    private Long patternId;

    @NotNull(message = "{unit.order.null}")
    @Positive(message = "{unit.order.negative}")
    @Column(name = "order_id",
            nullable = false)
    private Long orderId;

    @NotNull(message = "{unit.daytype.null}")
    @Positive(message = "{unit.daytype.negative}")
    @Column(name = "day_type_id",
            nullable = false)
    private Long dayTypeId;

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

    public PatternUnit() {
    }

    public PatternUnit(Long patternId, Long orderId, Long dayTypeId) {
        this.patternId = patternId;
        this.orderId = orderId;
        this.dayTypeId = dayTypeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatternId() {
        return patternId;
    }

    public void setPatternId(Long patternId) {
        this.patternId = patternId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDayTypeId() {
        return dayTypeId;
    }

    public void setDayTypeId(Long dayTypeId) {
        this.dayTypeId = dayTypeId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatternUnit unit = (PatternUnit) o;
        return patternId.equals(unit.patternId) &&
                orderId.equals(unit.orderId) &&
                dayTypeId.equals(unit.dayTypeId) &&
                Objects.equals(startTime, unit.startTime) &&
                Objects.equals(breakStartTime, unit.breakStartTime) &&
                Objects.equals(breakEndTime, unit.breakEndTime) &&
                Objects.equals(endTime, unit.endTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(patternId, orderId, dayTypeId,
                startTime, breakStartTime, breakEndTime, endTime);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", PatternUnit.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("patternId=" + patternId)
                .add("orderId=" + orderId)
                .add("dayTypeId=" + dayTypeId)
                .add("startTime=" + startTime)
                .add("breakStartTime=" + breakStartTime)
                .add("breakEndTime=" + breakEndTime)
                .add("endTime=" + endTime)
                .toString();
    }
}
