package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;

public interface SubstitutionCompositionService extends
        IByDepartmentIdAndDateService<SubstitutionComposition, Long>,
        IByShiftIdAndDateService<SubstitutionComposition, Long>,
        IService<SubstitutionComposition, Long> {
}