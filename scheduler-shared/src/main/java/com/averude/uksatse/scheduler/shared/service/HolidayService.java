package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import org.springframework.security.core.Authentication;

public interface HolidayService extends GenericService<Holiday, Long> {
    Iterable<Holiday> findAllByDepartmentId(Long departmentId);

    Iterable<Holiday> findAllByAuth(Authentication authentication);
}
