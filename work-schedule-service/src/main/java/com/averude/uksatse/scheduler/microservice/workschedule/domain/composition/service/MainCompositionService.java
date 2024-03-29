package com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.entity.MainComposition;

public interface MainCompositionService extends
        IByDepartmentIdAndDateService<MainComposition, Long>,
        IByShiftIdAndDateService<MainComposition, Long>,
        IService<MainComposition, Long> {
}
