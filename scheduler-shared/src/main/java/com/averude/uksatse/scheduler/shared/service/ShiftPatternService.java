package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;

public interface ShiftPatternService extends GenericService<ShiftPattern, Long> {
    Iterable<ShiftPattern> findAllByDepartmentId(long departmentId);
}
