package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.core.interfaces.service.*;

public interface SummationColumnService extends
        IByEnterpriseIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByDepartmentIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByShiftIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long>,
        IByEnterpriseIdService<SummationColumn, Long>,
        IByDepartmentIdService<SummationColumn, Long>,
        IByShiftIdService<SummationColumn, Long>,
        IDtoService<SummationColumn, SummationColumnDayTypeRange, Long> {
}
