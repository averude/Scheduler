package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface ShiftCompositionService extends
        IByDepartmentIdAndDateService<ShiftComposition, Long>,
        IByShiftIdAndDateService<ShiftComposition, Long>,
        IService<ShiftComposition, Long> {
}
