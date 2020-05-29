package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface DepartmentDayTypeService extends IByDepartmentIdService<DepartmentDayType, Long>,
        IByShiftIdService<DepartmentDayType, Long>, IService<DepartmentDayType, Long> {
}
