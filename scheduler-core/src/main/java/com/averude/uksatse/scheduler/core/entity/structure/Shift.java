package com.averude.uksatse.scheduler.core.entity.structure;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDepartmentId;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "shifts",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "shifts_unique_constraint",
                        columnNames = {"department_id", "name"})
        }
)
public class Shift implements HasId, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{shift.name.null}")
    @Size(  max = 128,
            min = 2,
            message = "{shift.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @Positive(message = "{shift.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @Positive(message = "{shift.pattern.negative}")
    @Column(name = "pattern_id",
            nullable = true)
    private Long patternId;

    @JsonIgnore
    @OneToMany( mappedBy = "shiftId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid ShiftComposition> employees = new ArrayList<>();

    public void addEmployee(Employee employee){
        ShiftComposition shiftComposition = new ShiftComposition(this, employee);
        employees.add(shiftComposition);
        employee.getShiftsList().add(shiftComposition);
    }

    public void removeEmployee(Employee employee){
        ShiftComposition shiftComposition = new ShiftComposition(this, employee);
        employee.getShiftsList().remove(shiftComposition);
        employees.remove(shiftComposition);
        shiftComposition.setShiftId(null);
        shiftComposition.setEmployeeId(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shift shift = (Shift) o;
        return Objects.equals(id, shift.id) &&
                Objects.equals(name, shift.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Shift.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("departmentId=" + departmentId)
                .add("patternId=" + patternId)
                .toString();
    }
}
