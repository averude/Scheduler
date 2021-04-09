package com.averude.uksatse.scheduler.core.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.Composition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
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
@Table(name = "substitution_compositions")
@NamedEntityGraph(
        name = "graph.SubstitutionComposition",
        attributeNodes = {
                @NamedAttributeNode(
                        value = "mainComposition"
                )
        }
)
public class SubstitutionComposition implements HasId, Composition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "department_id")
    private Long departmentId;

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
    @JoinColumn(name = "main_composition_id")
    private MainComposition mainComposition;

    @NotNull
    @Column(name = "from_date")
    private LocalDate from;

    @NotNull
    @Column(name = "to_date")
    private LocalDate to;
}
