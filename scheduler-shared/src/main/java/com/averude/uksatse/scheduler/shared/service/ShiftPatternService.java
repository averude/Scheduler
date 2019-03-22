package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.security.core.Authentication;

public interface ShiftPatternService extends GenericService<ShiftPattern, Long> {
    Iterable<ShiftPattern> findAllByDepartmentId(long departmentId);

    Iterable<ShiftPattern> findAllByAuth(Authentication authentication);
}
