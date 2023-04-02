package com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.entity.DepartmentDayType;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "shift_pattern_generation_rules")
@NamedEntityGraph(
        name = "graph.ShiftPatternGenerationRule.useDepartmentDayType",
        attributeNodes = @NamedAttributeNode(
                value = "useDepartmentDayType",
                subgraph = "graph.ShiftPatternGenerationRule.useDepartmentDayType.dayType"),
        subgraphs = {
                @NamedSubgraph(
                        name = "graph.ShiftPatternGenerationRule.useDepartmentDayType.dayType",
                        attributeNodes = @NamedAttributeNode(
                                value = "dayType",
                                subgraph = "graph.ShiftPatternGenerationRule.useDepartmentDayType.DayType.dayTypeGroup")),
                @NamedSubgraph(
                        name = "graph.ShiftPatternGenerationRule.useDepartmentDayType.DayType.dayTypeGroup",
                        attributeNodes = @NamedAttributeNode("dayTypeGroup")
                )
        }
)
public class ShiftPatternGenerationRule implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id")
    private Long orderId;

    @NotNull
    @Column(name = "shift_pattern_id")
    private Long shiftPatternId;

    @Column(name = "on_day_type_id")
    private Long onDayTypeId;

    @Max(7)
    @Min(1)
    @Column(name = "day_of_week")
    private Integer dayOfWeek;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "use_department_day_type_id")
    private DepartmentDayType useDepartmentDayType;

    @NotNull
    @Column(name = "type")
    private String type;
}
