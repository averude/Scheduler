package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;

public interface SummationColumnService extends
        IByEnterpriseIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IDtoService<SummationColumn, SummationColumnDayTypeRange, Long> {
}
