package com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;

public interface SummationColumnService extends
        IByEnterpriseIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByEnterpriseIdService<SummationColumn, Long>,
        IDtoService<SummationColumn, SummationColumnDayTypeRange, Long> {
}
