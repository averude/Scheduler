package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
        name = "shifts",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "shifts_unique_constraint",
                        columnNames = {"department_id", "name"})
        }
)
public class Shift implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{shift.name.null}")
    @Size(  max = 64,
            min = 2,
            message = "{shift.name.size}")
    @Column(nullable = false)
    private String name;

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
                fetch = FetchType.LAZY,
                orphanRemoval = true)
    private List<@NotNull @Valid Employee> employees = new ArrayList<>();

    public Shift() {
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

    public Long getPatternId() {
        return patternId;
    }

    public void setPatternId(Long patternId) {
        this.patternId = patternId;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public void addEmployee(Employee employee){
        employee.setShiftId(this.getId());
        employees.add(employee);
    }

    public void removeEmployee(Employee employee){
        employee.setShiftId(null);
        employees.remove(employee);
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
}