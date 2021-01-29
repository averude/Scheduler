package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.model.entity.ReportSheet;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ReportSheetDTO {
    ReportSheet reportSheet;
    List<Long> shiftIds;
}
