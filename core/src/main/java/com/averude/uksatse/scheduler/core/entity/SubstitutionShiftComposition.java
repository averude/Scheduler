package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.EntityComposition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDateDuration;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "substitution_shift_composition")
public class SubstitutionShiftComposition implements HasId, HasDateDuration, EntityComposition<Long, Employee> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "shift_composition_id")
    private MainShiftComposition mainShiftComposition;

    @NotNull
    @Column(name = "from_date")
    private LocalDate from;

    @NotNull
    @Column(name = "to_date")
    private LocalDate to;

    @JsonIgnore
    @Override
    public Long getSideA() {
        return shiftId;
    }

    @JsonIgnore
    @Override
    public Employee getSideB() {
        return employee;
    }

    @JsonIgnore
    @Override
    public void setSideA(Long sideA) {
        this.shiftId = sideA;
    }

    @JsonIgnore
    @Override
    public void setSideB(Employee sideB) {
        this.employee = sideB;
    }
}
