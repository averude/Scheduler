package com.averude.uksatse.scheduler.core.entity.structure;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
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
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "enterprises")
public class Enterprise implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{enterprise.name.empty}")
    @Size(  max = 128,
            min = 3,
            message = "{enterprise.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "enterpriseId",
                cascade = {CascadeType.PERSIST, CascadeType.MERGE},
                fetch = FetchType.LAZY)
    private List<Department> departments = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "enterpriseId",
                cascade = {CascadeType.PERSIST, CascadeType.MERGE},
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid DayType> dayTypes = new LinkedList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enterprise that = (Enterprise) o;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Enterprise.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("name='" + name + "'")
                .toString();
    }
}
