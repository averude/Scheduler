package com.averude.uksatse.scheduler.core.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity(name = "report_sheets")
@NamedEntityGraph(
        name = "graph.ReportSheet.reportSheetShifts",
        attributeNodes = @NamedAttributeNode("reportSheetShifts")
)
@NoArgsConstructor
public class ReportSheet implements HasId, HasDepartmentId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @JsonIgnore
    @Column(name = "department_id")
    private Long departmentId;

    @JsonIgnore
    @OneToMany( cascade = {CascadeType.PERSIST, CascadeType.MERGE},
                fetch = FetchType.LAZY,
                mappedBy = "reportSheetId")
    private List<ReportSheetShift> reportSheetShifts;
}
