package com.averude.uksatse.scheduler.core.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;

@Data
@NoArgsConstructor
@Entity(name = "work_schedule_views")
@NamedEntityGraph(
        name = "graph.WorkScheduleView.viewDayTypes",
        attributeNodes = @NamedAttributeNode("viewDayTypes")
)
public class WorkScheduleView implements HasId, HasEnterpriseId, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @NotNull
    @Column(name = "target_department_id")
    private Long targetDepartmentId;

    @NotNull
    @Column(name = "department_id")
    private Long departmentId;

    @NotNull
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "workScheduleViewId",
               cascade = {PERSIST, MERGE})
    private List<WorkScheduleViewDayType> viewDayTypes;
}
