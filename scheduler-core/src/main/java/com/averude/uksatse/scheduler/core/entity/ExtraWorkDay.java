package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "extra_work_days")
public class ExtraWorkDay implements HasId, HasEnterpriseId, HasDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @NotNull
    @Column(name = "enterprise_id", nullable = false)
    private Long enterpriseId;

    @Column(name = "extra_weekend_id", nullable = false)
    private Long extraWeekendId;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExtraWorkDay that = (ExtraWorkDay) o;
        return enterpriseId.equals(that.enterpriseId) &&
                Objects.equals(extraWeekendId, that.extraWeekendId) &&
                date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enterpriseId, extraWeekendId, date);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ExtraWorkDay.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("extraWeekendId=" + extraWeekendId)
                .add("date=" + date)
                .toString();
    }
}
