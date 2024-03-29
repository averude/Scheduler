package com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;

public interface SpecialCalendarDateService extends IByEnterpriseIdAndDateService<SpecialCalendarDate, Long>,
        IService<SpecialCalendarDate, Long> {
}
