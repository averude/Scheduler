package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeWorkStatDTO {
    private Employee employee;
    private Long shiftId;
    private List<EmployeePositionStat> positionStats;
}
