package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;

public interface ShiftService extends IByDepartmentIdService<Shift, Long>,
        IByShiftIdService<Shift, Long>, IService<Shift, Long> {
}
