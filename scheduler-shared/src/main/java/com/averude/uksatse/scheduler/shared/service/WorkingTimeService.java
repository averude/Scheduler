package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

import java.time.LocalDate;

public interface WorkingTimeService extends IByDepartmentIdAndDateDtoService<Shift, WorkingTime, Long>,
        IByDepartmentIdAndDateService<WorkingTime, Long>,
        IByShiftIdAndDateService<WorkingTime, Long>,IService<WorkingTime, Long> {

    void generateWorkingTimeNorm(Long departmentId,
                                 Long shiftId,
                                 LocalDate from,
                                 LocalDate to,
                                 int offset);
}
