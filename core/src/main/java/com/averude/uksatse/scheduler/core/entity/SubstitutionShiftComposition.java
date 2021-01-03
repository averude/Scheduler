package com.averude.uksatse.scheduler.core.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.EntityComposition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Setter
@Getter
@Entity
@Table(name = "substitution_shift_compositions")
@NamedEntityGraph(
        name = "graph.SubstitutionShiftComposition",
        attributeNodes = {
                @NamedAttributeNode(
                        value = "mainShiftComposition"
                )
        }
)
public class SubstitutionShiftComposition implements HasId, EntityComposition<Long, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;

    @NotNull
    @Column(name = "employee_id")
    private Long employeeId;

    @NotNull
    @Column(name = "position_id")
    private Long positionId;

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
    public Long getSideB() {
        return employeeId;
    }

    @JsonIgnore
    @Override
    public void setSideA(Long sideA) {
        this.shiftId = sideA;
    }

    @JsonIgnore
    @Override
    public void setSideB(Long sideB) {
        this.employeeId = sideB;
    }
}
