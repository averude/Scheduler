package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface WorkingTimeService extends IByDepartmentIdAndDateService<WorkingTime, Long>,
        IByShiftIdAndDateService<WorkingTime, Long>,IService<WorkingTime, Long> {
}
