package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;

public interface MainShiftCompositionService extends
        IByDepartmentIdAndDateService<MainShiftComposition, Long>,
        IByShiftIdAndDateService<MainShiftComposition, Long>,
        IService<MainShiftComposition, Long> {
}
