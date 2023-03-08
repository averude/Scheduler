package com.averude.uksatse.scheduler.core.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeWorkStatDTO {
    private Long employeeId;
    private Long shiftId;
    private Long mainPositionId;
    private List<EmployeePositionStat> positionStats;
}
