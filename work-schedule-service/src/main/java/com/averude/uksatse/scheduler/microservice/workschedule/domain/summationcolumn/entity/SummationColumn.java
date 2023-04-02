package com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.converters.ListStringConverter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "summation_columns")
@NamedEntityGraph(
        name = "graph.SummationColumn.dayTypeRanges",
        attributeNodes = @NamedAttributeNode("dayTypeRanges")
)
public class SummationColumn implements HasId, HasEnterpriseId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @NotNull
    @Column(name = "column_type")
    private String columnType;

    @Convert(converter = ListStringConverter.class)
    @Column(name = "special_calendar_date_types")
    private List<String> specialCalendarDateTypes;

    @NotNull
    private String name;

    @OneToMany( fetch = FetchType.LAZY,
                cascade = CascadeType.ALL,
                mappedBy = "summationColumnId")
    @OrderBy("dayTypeId ASC")
    private List<SummationColumnDayTypeRange> dayTypeRanges;

    @Override
    public String toString() {
        return new StringJoiner(", ", SummationColumn.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("name='" + name + "'")
                .toString();
    }
}


