package entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
public class Schedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column(name = "employee_id",
            nullable = false)
    private long employeeId;

    @NotNull
    @Column(nullable = false)
    private float hours;// Validation is needed

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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public float getHours() {
        return hours;
    }

    public void setHours(float hours) {
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
