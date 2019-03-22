package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;
import org.springframework.security.core.Authentication;

public interface ShiftService extends GenericService<Shift, Long> {
    Iterable<Shift> findAllByDepartmentId(long departmentId);

    Iterable<Shift> findAllByAuth(Authentication authentication);
}
