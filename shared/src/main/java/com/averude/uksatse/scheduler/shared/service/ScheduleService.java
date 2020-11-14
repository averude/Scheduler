package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;

public interface ScheduleService extends IByDepartmentIdAndDateDtoService<Employee, WorkDay, Long>,
        IByShiftIdAndDateDtoService<Employee, WorkDay, Long>,
        IService<WorkDay, Long> {
}
