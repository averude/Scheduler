package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;

public interface ShiftService extends GenericService<Shift, Long> {
    Iterable<Shift> findAllByDepartmentId(long departmentId);
}
