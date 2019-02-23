package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.CountDTO;

public interface StatisticsService {
    Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId);
}
