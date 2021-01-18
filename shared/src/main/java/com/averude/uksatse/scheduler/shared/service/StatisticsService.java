package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.dto.CountDTO;

import java.util.List;

public interface StatisticsService {
    List<CountDTO> countEmployeesByDepartmentId(Long departmentId);
}
