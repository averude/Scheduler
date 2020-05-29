package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "extra_weekends")
public class ExtraWeekend implements HasId, HasEnterpriseId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @Column(name = "holiday_id")
    private Long holidayId;

    @Column
    private LocalDate date;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExtraWeekend that = (ExtraWeekend) o;
        return enterpriseId.equals(that.enterpriseId) &&
                Objects.equals(holidayId, that.holidayId) &&
                date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enterpriseId, holidayId, date);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ExtraWeekend.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("holidayId=" + holidayId)
                .add("date=" + date)
                .toString();
    }
}
