package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ShiftPatternService extends GenericService<ShiftPattern, Long> {
    List<ShiftPattern> findAllByDepartmentId(long departmentId);

    List<ShiftPattern> findAllByAuth(Authentication authentication);
}
