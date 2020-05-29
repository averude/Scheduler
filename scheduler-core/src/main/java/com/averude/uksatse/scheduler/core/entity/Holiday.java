package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "holidays",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "holidays_unique_constraint",
                        columnNames = {"enterprise_id", "date"}
                )
        }
)
public class Holiday implements HasId, HasEnterpriseId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
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
            message = "{holiday.name.size}")
    @Column(nullable = false)
    private String name;

    @Override
    public String toString() {
        return new StringJoiner(", ", Holiday.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("date=" + date)
                .add("name='" + name + "'")
                .toString();
    }
}
