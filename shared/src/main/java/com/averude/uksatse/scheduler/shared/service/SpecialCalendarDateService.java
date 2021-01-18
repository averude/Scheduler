package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;

public interface SpecialCalendarDateService extends IByEnterpriseIdAndDateService<SpecialCalendarDate, Long>,
        IByDepartmentIdAndDateService<SpecialCalendarDate, Long>,
        IByShiftIdAndDateService<SpecialCalendarDate, Long>,
        IService<SpecialCalendarDate, Long> {
}
