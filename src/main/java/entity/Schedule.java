package entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Schedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "{schedule.employee.null}")
    @Column(name = "employee_id",
            nullable = false)
    private Long employeeId;

    @NotNull(message = "{schedule.isholiday.null}")
    @Column(nullable = false)
    private Boolean isHoliday;

    @NotNull(message = "{schedule.hours.null}")
    @Column(nullable = false)
    private Float hours;

    @NotNull(message = "{schedule.date.null}")
    @Column(nullable = false)
    private LocalDate date;

    public Schedule() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Boolean getHoliday() {
        return isHoliday;
    }

    public void setHoliday(Boolean holiday) {
        isHoliday = holiday;
    }

    public Float getHours() {
        return hours;
    }

    public void setHours(Float hours) {
        this.hours = hours;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Schedule schedule = (Schedule) o;
        return Objects.equals(id, schedule.id) &&
                Objects.equals(employeeId, schedule.employeeId) &&
                Objects.equals(hours, schedule.hours) &&
                Objects.equals(date, schedule.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, employeeId, hours, date);
    }
}
