package com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.dto;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity.ReportSheet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportSheetDTO implements Serializable {

    @NotNull
    private ReportSheet reportSheet;

    private List<Long> shiftIds;
}
