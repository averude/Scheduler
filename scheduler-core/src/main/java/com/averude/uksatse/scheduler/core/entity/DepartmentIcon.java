package com.averude.uksatse.scheduler.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "icons",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "icons_unique_constraint",
                        columnNames = {"file_name"})
        }
)
public class DepartmentIcon implements HasId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(  max = 255,
            min = 3)
    @Column(name = "file_name")
    private String fileName;

    @JsonIgnore
    @OneToMany( mappedBy = "iconId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY)
    private List<@NotNull @Valid Department> departments = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public void addDepartment(Department department) {
        department.setIconId(getId());
        departments.add(department);
    }

    public void removeDepartment(Department department) {
        department.setIconId(null);
        departments.remove(department);
    }
}
