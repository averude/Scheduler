package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
        name = "departments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "departments_unique_constraint",
                        columnNames = {"name"})
        }
)
public class Department implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{department.name.empty}")
    @Size(  max = 128,
            min = 3,
            message = "{department.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid Position> positions = new LinkedList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid ShiftPattern> patterns = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid Shift> shifts = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid Holiday> holidays = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid WorkingTime> workingTimes = new ArrayList<>();

    public Department() {
    }

    public Department(@NotNull(message = "{department.name.empty}")
                      @Size(max = 128,
                            min = 3,
                            message = "{department.name.size}")
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

    public List<@NotNull @Valid Position> getPositions() {
        return positions;
    }

    public void setPositions(List<@NotNull @Valid Position> positions) {
        this.positions = positions;
    }

    public List<@NotNull @Valid ShiftPattern> getPatterns() {
        return patterns;
    }

    public void setPatterns(List<@NotNull @Valid ShiftPattern> patterns) {
        this.patterns = patterns;
    }

    public List<@NotNull @Valid Shift> getShifts() {
        return shifts;
    }

    public void setShifts(List<@NotNull @Valid Shift> shifts) {
        this.shifts = shifts;
    }

    public List<Holiday> getHolidays() {
        return holidays;
    }

    public void setHolidays(List<Holiday> holidays) {
        this.holidays = holidays;
    }

    public List<WorkingTime> getWorkingTimes() {
        return workingTimes;
    }

    public void setWorkingTimes(List<WorkingTime> workingTimes) {
        this.workingTimes = workingTimes;
    }

    public void addPosition(Position position){
        position.setDepartmentId(this.getId());
        positions.add(position);
    }

    public void removePosition(Position position){
        position.setDepartmentId(null);
        positions.remove(position);
    }

    public void addShift(Shift shift){
        shift.setDepartmentId(this.getId());
        shifts.add(shift);
    }

    public void removeShift(Shift shift){
        shift.setDepartmentId(null);
        shifts.remove(shift);
    }

    public void addPattern(ShiftPattern pattern){
        pattern.setDepartmentId(this.getId());
        patterns.add(pattern);
    }

    public void removePattern(ShiftPattern pattern){
        pattern.setDepartmentId(null);
        patterns.remove(pattern);
    }

    public void addHoliday(Holiday holiday) {
        holiday.setDepartmentId(this.getId());
        holidays.add(holiday);
    }

    public void removeHoliday(Holiday holiday) {
        holiday.setDepartmentId(null);
        holidays.remove(holiday);
    }

    public void addWorkingTime(WorkingTime workingTime) {
        workingTime.setDepartmentId(this.getId());
        workingTimes.add(workingTime);
    }

    public void removeWorkingTime(WorkingTime workingTime) {
        workingTime.setDepartmentId(null);
        workingTimes.remove(workingTime);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Department that = (Department) o;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
