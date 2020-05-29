package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface HolidayService extends IByEnterpriseIdAndDateService<Holiday, Long>,
        IByDepartmentIdAndDateService<Holiday, Long>, IByShiftIdAndDateService<Holiday, Long>,
        IService<Holiday, Long> {
}
