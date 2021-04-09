package com.averude.uksatse.scheduler.core.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDate;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(
        name = "special_calendar_dates",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "special_calendar_dates_unique_constraint",
                        columnNames = {"enterprise_id", "date"}
                )
        }
)
public class SpecialCalendarDate implements HasId, HasEnterpriseId, HasDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enterprise_id",
            nullable = false)
    private Long enterpriseId;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @NotNull
    @Size(  max = 255,
            min = 3,
            message = "{specialDateType.name.size}")
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(name = "date_type", nullable = false)
    private String dateType; // "holiday" or "extra_weekend" or "extra_workday"
}
