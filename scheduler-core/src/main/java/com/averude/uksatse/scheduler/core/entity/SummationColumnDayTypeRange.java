package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasTimeDuration;
import com.averude.uksatse.scheduler.core.json.deserializer.StringToIntTimeDeserializer;
import com.averude.uksatse.scheduler.core.json.serializer.IntToStringTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "summation_columns_day_types_ranges")
public class SummationColumnDayTypeRange implements HasId, HasTimeDuration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "summation_column_id")
    private Long summationColumnId;

    @NotNull
    @Column(name = "day_type_id")
    private Long dayTypeId;

    @JsonSerialize(using = IntToStringTimeSerializer.class)
    @JsonDeserialize(using = StringToIntTimeDeserializer.class)
    @Column(name = "from_time")
    private Integer from;

    @JsonSerialize(using = IntToStringTimeSerializer.class)
    @JsonDeserialize(using = StringToIntTimeDeserializer.class)
    @Column(name = "to_time")
    private Integer to;
}
