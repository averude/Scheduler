package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
@Table(
        name = "employees",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "employees_unique_constraint",
                        columnNames = {
                                "first_name",
                                "second_name",
                                "patronymic",
                                "position_id"
                        })
        }
)
public class Employee implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

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

    @NotNull(message = "{employee.position.null}")
    @ManyToOne
    @JoinColumn(name = "position_id",
                nullable = false)
    private Position position;

    @JsonIgnore
    @OneToMany( mappedBy = "employeeId",
                cascade = CascadeType.ALL)
    private List<@NotNull @Valid ShiftComposition> shiftsList = new ArrayList<>();

    @OneToMany( mappedBy = "employeeId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid WorkDay> schedule = new ArrayList<>();

    public Employee() {
    }

    public Employee(@NotNull(message = "{employee.secondname.null}")
                    @Size(max = 20,
                            min = 3,
                            message = "{employee.secondname.size}")
                            String secondName,
                    @NotNull(message = "{employee.firstname.null}")
                    @Size(max = 20,
                          min = 3,
                          message = "{employee.firstname.size}")
                    String firstName,
                    @Size(max = 20,
                          min = 3,
                          message = "{employee.patronymic.size}")
                    String patronymic
                    ) {
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.secondName = secondName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public List<ShiftComposition> getShiftsList() {
        return shiftsList;
    }

    public void setShiftsList(List<ShiftComposition> shiftsList) {
        this.shiftsList = shiftsList;
    }

    @JsonIgnore // Don't know why, but in this case field annotation doesn't work.
    public List<WorkDay> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<WorkDay> scheduleList) {
        this.schedule = scheduleList;
    }

    public void addWorkDay(WorkDay workDay){
        workDay.setEmployeeId(this.getId());
        schedule.add(workDay);
    }

    public void removeWorkDay(WorkDay workDay){
        workDay.setEmployeeId(null);
        schedule.remove(workDay);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(firstName, employee.firstName) &&
                Objects.equals(patronymic, employee.patronymic) &&
                Objects.equals(secondName, employee.secondName) &&
                Objects.equals(position, employee.position);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, patronymic, secondName, position);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Employee.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("firstName='" + firstName + "'")
                .add("patronymic='" + patronymic + "'")
                .add("secondName='" + secondName + "'")
                .add("position=" + position)
                .toString();
    }
}
