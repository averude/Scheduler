package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.model.entity.ReportSheet;
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
