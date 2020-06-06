package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "summation_columns")
public class SummationColumn implements HasId, HasEnterpriseId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @NotNull
    @Column(name = "only_holidays")
    private Boolean onlyHolidays = false;

    @NotNull
    private String name;

    @OneToMany( fetch = FetchType.EAGER,
                cascade = CascadeType.ALL,
                mappedBy = "summationColumnId")
    private Set<SummationColumnDayTypeRange> dayTypeRanges;

    @Override
    public String toString() {
        return new StringJoiner(", ", SummationColumn.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("name='" + name + "'")
                .toString();
    }
}


