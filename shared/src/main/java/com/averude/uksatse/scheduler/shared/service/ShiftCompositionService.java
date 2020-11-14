package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;

public interface ShiftCompositionService extends
        IByDepartmentIdAndDateService<ShiftComposition, Long>,
        IByShiftIdAndDateService<ShiftComposition, Long>,
        IService<ShiftComposition, Long> {
}
