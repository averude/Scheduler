package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface DayTypeService extends IByEnterpriseIdService<DayType, Long>,
        IByDepartmentIdService<DayType, Long>, IByShiftIdService<DayType, Long>, IService<DayType, Long> {
}
