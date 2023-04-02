package com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.Objects;
import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(
        name = "employees",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "employees_unique_constraint",
                        columnNames = {
                                "first_name",
                                "second_name",
                                "patronymic"
                        })
        }
)
public class Employee implements HasId, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull
    @Column(name = "department_id")
    private Long departmentId;

    @NotNull(message = "{employee.firstname.null}")
    @Size(   max = 20,
             min = 3,
             message = "{employee.firstname.size}")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Size(  max = 20,
            min = 3,
            message = "{employee.patronymic.size}")
    @Column(name = "patronymic")
    private String patronymic;

    @NotNull(message = "{employee.secondname.null}")
    @Size(  max = 20,
            min = 3,
            message = "{employee.secondname.size}")
    @Column(name = "second_name", nullable = false)
    private String secondName;

    public Employee(String secondName,
                    String firstName,
                    String patronymic) {
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.secondName = secondName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(departmentId, employee.departmentId) &&
                Objects.equals(firstName, employee.firstName) &&
                Objects.equals(patronymic, employee.patronymic) &&
                Objects.equals(secondName, employee.secondName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, departmentId, firstName, patronymic, secondName);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Employee.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("firstName='" + firstName + "'")
                .add("patronymic='" + patronymic + "'")
                .add("secondName='" + secondName + "'")
                .toString();
    }
}
