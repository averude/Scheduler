package entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
public class Schedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "{schedule.employee.null}")
    @Column(name = "employee_id",
            nullable = false)
    private Long employeeId;

    @NotNull(message = "{schedule.hours.null}")
    @Column(nullable = false)
    private Float hours;

    @NotNull
    @Size(  max = 31,
            min = 1,
            message = "{}")
    @Column(nullable = false)
    private int day;

    @NotNull
    @Size(  max = 11,
            min = 0,
            message = "{}")
    @Column(nullable = false)
    private int month;

    @NotNull
    @Size(  max = 2030,
            min = 2000,
            message = "{}")
    @Column(name = "y", //because of Derby's constraint of the "year" column name
            nullable = false)
    private int year;

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

    public Float getHours() {
        return hours;
    }

    public void setHours(Float hours) {
        this.hours = hours;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
