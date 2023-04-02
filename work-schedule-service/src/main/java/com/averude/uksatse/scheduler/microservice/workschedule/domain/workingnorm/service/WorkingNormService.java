package com.averude.uksatse.scheduler.microservice.workschedule.domain.workingnorm.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.entity.Shift;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workingnorm.entity.WorkingNorm;

public interface WorkingNormService extends IByDepartmentIdAndDateDtoService<Shift, WorkingNorm, Long>,
        IByDepartmentIdAndDateService<WorkingNorm, Long>,
        IService<WorkingNorm, Long> {
}
