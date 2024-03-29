package com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdsService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.entity.Shift;

public interface ShiftService extends IByDepartmentIdService<Shift, Long>,
        IByShiftIdsService<Shift, Long>, IService<Shift, Long> {
}
