package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import org.springframework.security.core.Authentication;

public interface StatisticsService {
    Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId);

    Iterable<CountDTO> countEmployeesByAuth(Authentication authentication);
}
