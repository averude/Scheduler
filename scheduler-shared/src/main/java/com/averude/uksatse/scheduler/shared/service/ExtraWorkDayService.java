package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface ExtraWorkDayService extends IByEnterpriseIdAndDateService<ExtraWorkDay, Long>,
        IByDepartmentIdAndDateService<ExtraWorkDay, Long>,
        IByShiftIdAndDateService<ExtraWorkDay, Long>,
        IService<ExtraWorkDay, Long> {
}
