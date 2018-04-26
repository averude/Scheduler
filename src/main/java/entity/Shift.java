package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Shift implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull(message = "{shift.name.null}")
    @Size(  max = 64,
            min = 2,
            message = "{shift.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "shiftId",
                cascade = CascadeType.ALL,
                fetch = FetchType.EAGER,
                orphanRemoval = true)
    private List<@NotNull @Valid Employee> employees = new ArrayList<>();

    public Shift() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        return id == shift.id &&
                Objects.equals(name, shift.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
