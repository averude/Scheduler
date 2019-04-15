package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.security.core.Authentication;

public interface WorkingTimeService extends GenericService<WorkingTime, Long> {
    Iterable<WorkingTime> findAllByDepartmentId(Long departmentId);

    Iterable<WorkingTime> findAllByAuth(Authentication authentication);
}
