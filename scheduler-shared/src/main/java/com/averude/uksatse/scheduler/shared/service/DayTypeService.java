package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;
import org.springframework.security.core.Authentication;

public interface DayTypeService extends GenericService<DayType, Long> {
    Iterable<DayType> findAllByDepartmentId(Long departmentId);
    Iterable<DayType> findAllByAuth(Authentication authentication);
}
