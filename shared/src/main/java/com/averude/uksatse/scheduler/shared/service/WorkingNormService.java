package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;

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
