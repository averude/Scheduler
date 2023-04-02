package com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Data
@AllArgsConstructor
@Entity(name = "report_sheets_shifts")
@IdClass(ReportSheetShift.PK.class)
@NoArgsConstructor
public class ReportSheetShift {

    @Id
    @Column(name = "report_sheet_id")
    private Long reportSheetId;

    @Id
    @Column(name = "shift_id")
    private Long shiftId;

    @Data
    public static class PK implements Serializable {
        private Long reportSheetId;
        private Long shiftId;
    }
}
