package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(
        name = "positions",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "positions_unique_constraint",
                        columnNames = {"name", "department_id"})
        }
)
public class Position implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{position.name.null}")
    @Size(  max = 128,
            min = 3,
            message = "{position.name.size}")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "{position.department.null}")
    @Positive(message = "{position.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @JsonIgnore
    @OneToMany( mappedBy = "positionId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private Set<@NotNull @Valid Employee> employees = new HashSet<>();

    public Position() {
    }

    public Position(@NotNull(message = "{position.name.null}")
                    @Size(max = 64,
                          min = 3,
                          message = "{position.name.size}")
                    String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void addEmployee(Employee employee){
        employee.setPositionId(this.getId());
        employees.add(employee);
    }

    public void removeEmployee(Employee employee){
        employee.setPositionId(null);
        employees.remove(employee);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Position position = (Position) o;
        return Objects.equals(id, position.id) &&
                Objects.equals(name, position.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
