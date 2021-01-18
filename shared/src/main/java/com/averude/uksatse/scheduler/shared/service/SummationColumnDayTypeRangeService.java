package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;

public interface SummationColumnDayTypeRangeService extends IByEnterpriseIdService<SummationColumnDayTypeRange, Long>,
        IByDepartmentIdService<SummationColumnDayTypeRange, Long>, IByShiftIdService<SummationColumnDayTypeRange, Long>,
        IService<SummationColumnDayTypeRange, Long> {
}
