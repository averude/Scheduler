package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface StatisticsService {
    List<CountDTO> countEmployeesByDepartmentId(long departmentId);

    List<CountDTO> countEmployeesByAuth(Authentication authentication);
}
