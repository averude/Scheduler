package com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.converter.JsonReportParticipantConverter;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.converter.JsonReportParticipantsConverter;
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
    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "report_caption")
    private String caption;

    @Convert(converter = JsonReportParticipantsConverter.class)
    @Column(name = "creators_json")
    private ReportSheetParticipant[] creators;

    @Convert(converter = JsonReportParticipantConverter.class)
    @Column(name = "approved_json")
    private ReportSheetParticipant approved;

    @Convert(converter = JsonReportParticipantConverter.class)
    @Column(name = "agreed_json")
    private ReportSheetParticipant agreed;

    @JsonIgnore
    @OneToMany( cascade = {CascadeType.PERSIST, CascadeType.MERGE},
                fetch = FetchType.LAZY,
                mappedBy = "reportSheetId")
    private List<ReportSheetShift> reportSheetShifts;
}
