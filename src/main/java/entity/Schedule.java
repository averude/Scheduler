package entity;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(
        name = "schedule",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "schedule_unique_constraint",
                        columnNames = {"employee_id", "date"})
        }
)
public class Schedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{schedule.employee.null}")
    @Positive(message = "{schedule.employee.negative}")
    @Column(name = "employee_id",
            nullable = false)
    private Long employeeId;

    @NotNull(message = "{schedule.isholiday.null}")
    @Column(nullable = false)
    private Boolean holiday;

    @NotNull(message = "{schedule.hours.null}")
    @PositiveOrZero(message = "{schedule.hours.negative}")
    @DecimalMax(value = "24",
                message = "{schedule.hours.max}")
    @Column(nullable = false)
    private Float hours;

    @NotNull(message = "{schedule.date.null}")
    @Column(nullable = false)
    private LocalDate date;

    public Schedule() {
    }

    public Schedule(Long employeeId,
                    Boolean holiday,
                    Float hours,
                    LocalDate date) {
        this.employeeId = employeeId;
        this.holiday = holiday;
        this.hours = hours;
        this.date = date;
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
        return holiday;
    }

    public void setHoliday(Boolean holiday) {
        this.holiday = holiday;
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
