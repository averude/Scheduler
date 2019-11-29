package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.stream.Collectors;

@Entity
@Table(
        name = "shift_patterns",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "shift_paterns_unique_constraint",
                        columnNames = {"department_id", "name"}
                )
        }
)
public class ShiftPattern implements HasId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{shiftpattern.department.null}")
    @Positive(message = "{shiftpattern.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @NotNull(message = "{shiftpattern.name.null}")
    @Size(  max = 128,
            min = 3,
            message = "{shiftpattern.name.size}")
    @Column(nullable = false)
    private String name;

    @Column(name = "holiday_day_type_id")
    private Long holidayDayTypeId;

    @Column(name = "extra_weekend_day_type_id")
    private Long extraWeekendDayTypeId;

    @Column(name = "extra_work_day_day_type_id")
    private Long extraWorkDayDayTypeId;

    @JsonIgnore
    @Transient
    private DayType holidayDayType;

    @JsonIgnore
    @Transient
    private DayType extraWeekendDayType;

    @JsonIgnore
    @Transient
    private DayType extraWorkDayDayType;

    @JsonIgnore
    @OneToMany( mappedBy = "patternId",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @OrderBy("orderId ASC")
    private List<PatternUnit> sequence = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "patternId")
    private List<Shift> shifts = new ArrayList<>();

    public ShiftPattern() {
    }

    public ShiftPattern(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getHolidayDayTypeId() {
        return holidayDayTypeId;
    }

    public void setHolidayDayTypeId(Long holidayDayTypeId) {
        this.holidayDayTypeId = holidayDayTypeId;
    }

    public Long getExtraWeekendDayTypeId() {
        return extraWeekendDayTypeId;
    }

    public void setExtraWeekendDayTypeId(Long extraWeekendDayTypeId) {
        this.extraWeekendDayTypeId = extraWeekendDayTypeId;
    }

    public DayType getHolidayDayType() {
        return holidayDayType;
    }

    public void setHolidayDayType(DayType holidayDayType) {
        this.holidayDayType = holidayDayType;
    }

    public DayType getExtraWeekendDayType() {
        return extraWeekendDayType;
    }

    public void setExtraWeekendDayType(DayType extraWeekendDayType) {
        this.extraWeekendDayType = extraWeekendDayType;
    }

    public Long getExtraWorkDayDayTypeId() {
        return extraWorkDayDayTypeId;
    }

    public void setExtraWorkDayDayTypeId(Long extraWorkDayDayTypeId) {
        this.extraWorkDayDayTypeId = extraWorkDayDayTypeId;
    }

    public DayType getExtraWorkDayDayType() {
        return extraWorkDayDayType;
    }

    public void setExtraWorkDayDayType(DayType extraWorkDayDayType) {
        this.extraWorkDayDayType = extraWorkDayDayType;
    }

    public List<PatternUnit> getSequence() {
        return sequence;
    }

    public void setSequence(List<PatternUnit> sequence) {
        this.sequence = sequence;
    }

    public List<Shift> getShifts() {
        return shifts;
    }

    public void setShifts(List<Shift> shifts) {
        this.shifts = shifts;
    }

    public void addPatternUnit(PatternUnit patternUnit) {
        patternUnit.setPatternId(this.getId());
        sequence.add(patternUnit);
    }

    public void removePatternUnit(PatternUnit patternUnit) {
        patternUnit.setPatternId(null);
        sequence.remove(patternUnit);
    }

    public void addShift(Shift shift) {
        shift.setPatternId(this.getId());
        shifts.add(shift);
    }

    public void removeShift(Shift shift) {
        shift.setPatternId(null);
        shifts.remove(shift);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShiftPattern that = (ShiftPattern) o;
        return departmentId.equals(that.departmentId) &&
                name.equals(that.name) &&
//                overrideExistingValues.equals(that.overrideExistingValues) &&
                Objects.equals(holidayDayTypeId, that.holidayDayTypeId) &&
                Objects.equals(extraWeekendDayTypeId, that.extraWeekendDayTypeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, name,
//                overrideExistingValues,
                holidayDayTypeId, extraWeekendDayTypeId);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", "\r\n{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("name='" + name + "'")
//                .add("overrideExistingValues=" + overrideExistingValues)
                .add("holidayDayTypeId=" + holidayDayTypeId)
                .add("extraWeekendDayTypeId=" + extraWeekendDayTypeId)
                .toString();
    }
}
