package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.MainComposition;

public interface MainCompositionService extends
        IByDepartmentIdAndDateService<MainComposition, Long>,
        IByShiftIdAndDateService<MainComposition, Long>,
        IService<MainComposition, Long> {
}
