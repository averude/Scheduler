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

    @ManyToOne
    @JoinColumn(name = "holiday_dep_day_type_id")
    private DepartmentDayType holidayDepDayType;

    @ManyToOne
    @JoinColumn(name = "extra_weekend_dep_day_type_id")
    private DepartmentDayType extraWeekendDepDayType;

    @ManyToOne
    @JoinColumn(name = "extra_work_day_dep_day_type_id")
    private DepartmentDayType extraWorkDayDepDayType;

    @JsonIgnore
    @OneToMany( mappedBy = "patternId",
                fetch = FetchType.LAZY,
                cascade = CascadeType.ALL)
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

    public DepartmentDayType getHolidayDepDayType() {
        return holidayDepDayType;
    }

    public void setHolidayDepDayType(DepartmentDayType holidayDepDayType) {
        this.holidayDepDayType = holidayDepDayType;
    }

    public DepartmentDayType getExtraWeekendDepDayType() {
        return extraWeekendDepDayType;
    }

    public void setExtraWeekendDepDayType(DepartmentDayType extraWeekendDepDayType) {
        this.extraWeekendDepDayType = extraWeekendDepDayType;
    }

    public DepartmentDayType getExtraWorkDayDepDayType() {
        return extraWorkDayDepDayType;
    }

    public void setExtraWorkDayDepDayType(DepartmentDayType extraWorkDayDepDayType) {
        this.extraWorkDayDepDayType = extraWorkDayDepDayType;
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
                Objects.equals(holidayDepDayType, that.holidayDepDayType) &&
                Objects.equals(extraWeekendDepDayType, that.extraWeekendDepDayType) &&
                Objects.equals(extraWorkDayDepDayType, that.extraWorkDayDepDayType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(departmentId, name, holidayDepDayType, extraWeekendDepDayType, extraWorkDayDepDayType);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ShiftPattern.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("departmentId=" + departmentId)
                .add("name='" + name + "'")
                .add("holidayDepDayType=" + holidayDepDayType)
                .add("extraWeekendDepDayType=" + extraWeekendDepDayType)
                .add("extraWorkDayDepDayType=" + extraWorkDayDepDayType)
                .toString();
    }
}
