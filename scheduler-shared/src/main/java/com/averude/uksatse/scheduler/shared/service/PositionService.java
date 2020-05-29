package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdService;
import com.averude.uksatse.scheduler.core.service.IService;

public interface PositionService extends IByDepartmentIdService<Position, Long>,
        IByShiftIdService<Position, Long>, IService<Position, Long> {
}
