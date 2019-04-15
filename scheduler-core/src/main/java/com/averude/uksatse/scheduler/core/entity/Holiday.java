package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(
        name = "holidays",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "holidays_unique_constraint",
                        columnNames = {"department_id", "date"}
                )
        }
)
public class Holiday implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @NotNull
    @Size(  max = 255,
            min = 3,
            message = "{holiday.name.size}")
    @Column(nullable = false)
    private String name;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
