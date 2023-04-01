package com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;

public interface DepartmentDayTypeService extends IByDepartmentIdService<DepartmentDayType, Long>, IService<DepartmentDayType, Long> {
}
