package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

import java.time.LocalDate;

public interface WorkingNormService extends IByDepartmentIdAndDateDtoService<Shift, WorkingNorm, Long>,
        IByDepartmentIdAndDateService<WorkingNorm, Long>,
        IByShiftIdAndDateService<WorkingNorm, Long>,IService<WorkingNorm, Long> {

    void generateWorkingNorm(Long departmentId,
                             Long shiftId,
                             LocalDate from,
                             LocalDate to,
                             int offset);
}
