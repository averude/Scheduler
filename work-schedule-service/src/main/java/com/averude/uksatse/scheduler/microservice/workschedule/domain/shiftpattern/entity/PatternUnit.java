package com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.core.json.deserializer.StringToIntTimeDeserializer;
import com.averude.uksatse.scheduler.core.json.serializer.IntToStringTimeSerializer;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDayTypeAndTime;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
@NamedEntityGraph(
        name = "graph.PatternUnit.dayType",
        attributeNodes = @NamedAttributeNode(value = "dayType", subgraph = "dayType"),
        subgraphs = {
                @NamedSubgraph(
                        name = "dayType",
                        attributeNodes = @NamedAttributeNode("dayTypeGroup")
                )
        }
)
public class PatternUnit implements HasId, HasDayTypeAndTime {

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
    @ManyToOne
    @JoinColumn(name = "day_type_id")
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

    public PatternUnit(Long patternId, Long orderId, DayType dayType) {
        this.patternId = patternId;
        this.orderId = orderId;
        this.dayType = dayType;
    }

    public PatternUnit(HasDayTypeAndTime hasDayTypeIdAndTime) {
        this.dayType        = hasDayTypeIdAndTime.getDayType();
        this.startTime      = hasDayTypeIdAndTime.getStartTime();
        this.endTime        = hasDayTypeIdAndTime.getEndTime();
        this.breakStartTime = hasDayTypeIdAndTime.getBreakStartTime();
        this.breakEndTime   = hasDayTypeIdAndTime.getBreakEndTime();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatternUnit unit = (PatternUnit) o;
        return patternId.equals(unit.patternId) &&
                orderId.equals(unit.orderId) &&
                dayType.equals(unit.dayType) &&
                Objects.equals(startTime, unit.startTime) &&
                Objects.equals(breakStartTime, unit.breakStartTime) &&
                Objects.equals(breakEndTime, unit.breakEndTime) &&
                Objects.equals(endTime, unit.endTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(patternId, orderId, dayType,
                startTime, breakStartTime, breakEndTime, endTime);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", PatternUnit.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("patternId=" + patternId)
                .add("orderId=" + orderId)
                .add("dayType=" + dayType)
                .add("startTime=" + startTime)
                .add("breakStartTime=" + breakStartTime)
                .add("breakEndTime=" + breakEndTime)
                .add("endTime=" + endTime)
                .toString();
    }
}
