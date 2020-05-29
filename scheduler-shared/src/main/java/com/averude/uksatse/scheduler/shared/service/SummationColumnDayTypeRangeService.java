package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface SummationColumnDayTypeRangeService extends IByEnterpriseIdService<SummationColumnDayTypeRange, Long>,
        IByDepartmentIdService<SummationColumnDayTypeRange, Long>, IByShiftIdService<SummationColumnDayTypeRange, Long>,
        IService<SummationColumnDayTypeRange, Long> {
}
