package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.SubstitutionShiftComposition;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;

public interface SubstitutionShiftCompositionService extends
        IByDepartmentIdAndDateService<SubstitutionShiftComposition, Long>,
        IByShiftIdAndDateService<SubstitutionShiftComposition, Long>,
        IService<SubstitutionShiftComposition, Long> {
}
