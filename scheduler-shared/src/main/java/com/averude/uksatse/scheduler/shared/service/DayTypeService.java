package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;

import java.util.List;

public interface DayTypeService extends GenericService<DayType, Long> {
    List<DayType> findAllByDepartmentId(Long departmentId);
    List<DayType> findAllByShiftId(Long shiftId);
}
