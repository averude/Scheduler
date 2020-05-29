package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

import java.time.LocalDate;

public interface ExtraWeekendService extends IByEnterpriseIdAndDateService<ExtraWeekend, Long>,
        IByDepartmentIdAndDateService<ExtraWeekend, Long>, IByShiftIdAndDateService<ExtraWeekend, Long>,
        IService<ExtraWeekend, Long> {
    ExtraWorkDay transferWorkDay(ExtraWeekend extraWeekend, LocalDate date);
}
