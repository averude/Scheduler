package entity;

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
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    @Column(name = "patronymic", nullable = true)
    private String patronymic;

    @NotNull(message = "{employee.secondname.null}")
    @Size(  max = 20,
            min = 3,
            message = "{employee.secondname.size}")
    @Column(name = "second_name", nullable = false)
    private String secondName;

    @NotNull(message = "{employee.position.null}")
    @Positive(message = "{employee.position.negative}")
    @Column(name = "position_id",
            nullable = false)
    private Long positionId;

    @Positive(message = "{employee.shift.negative}")
    @Column(name = "shift_id",
            nullable = true)
    private Long shiftId;

    @OneToMany( mappedBy = "employeeId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                orphanRemoval = true)
    private List<@NotNull @Valid Schedule> scheduleList = new ArrayList<>();

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

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    @JsonIgnore // Don't know why, but in this case field annotation doesn't work.
    public List<Schedule> getSchedule() {
        return scheduleList;
    }

    public void setSchedule(List<Schedule> scheduleList) {
        this.scheduleList = scheduleList;
    }

    public void addSchedule(Schedule schedule){
        schedule.setEmployeeId(this.getId());
        scheduleList.add(schedule);
    }

    public void removeSchedule(Schedule schedule){
        schedule.setEmployeeId(null);
        scheduleList.remove(schedule);
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
                Objects.equals(positionId, employee.positionId) &&
                Objects.equals(shiftId, employee.shiftId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, patronymic, secondName, positionId, shiftId);
    }
}
