package com.averude.uksatse.scheduler.core.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class EmployeePositionStat {
    private Long positionId;
    private List<SummationResult> summations;
}
