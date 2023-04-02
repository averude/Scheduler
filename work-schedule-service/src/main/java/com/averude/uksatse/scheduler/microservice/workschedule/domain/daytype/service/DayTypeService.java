package com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;

public interface DayTypeService extends IByEnterpriseIdService<DayType, Long>, IService<DayType, Long> {
}
