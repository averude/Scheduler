package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;

import java.util.List;

public interface DepartmentDayTypeService extends GenericService<DepartmentDayType, Long> {
    List<DepartmentDayType> findAllByDepartmentId(Long departmentId);
    List<DepartmentDayType> findAllByShiftId(Long shiftId);
}
