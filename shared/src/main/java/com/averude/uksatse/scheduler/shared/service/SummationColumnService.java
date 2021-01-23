package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.*;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;

public interface SummationColumnService extends
        IByEnterpriseIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByDepartmentIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByShiftIdsDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByEnterpriseIdService<SummationColumn, Long>,
        IByDepartmentIdService<SummationColumn, Long>,
        IByShiftIdsService<SummationColumn, Long>,
        IDtoService<SummationColumn, SummationColumnDayTypeRange, Long> {
}
