package com.averude.uksatse.scheduler.core.entity.structure;

import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "departments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "departments_unique_constraint",
                        columnNames = {"name"})
        }
)
public class Department implements HasId, HasEnterpriseId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @JsonIgnore
    @NotNull
    @Column(name = "enterprise_id",
            nullable = false)
    private Long enterpriseId;

    @NotNull(message = "{department.name.empty}")
    @Size(  max = 128,
            min = 3,
            message = "{department.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid Position> positions;

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid ShiftPattern> patterns;

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid Shift> shifts;

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid WorkingTime> workingTimes;

    public Department(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Department that = (Department) o;
        return enterpriseId.equals(that.enterpriseId) &&
                name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enterpriseId, name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Department.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("enterpriseId=" + enterpriseId)
                .add("name='" + name + "'")
                .toString();
    }
}
