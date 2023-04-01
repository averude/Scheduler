package com.averude.uksatse.scheduler.microservice.workschedule.domain.position.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.Position;

public interface PositionService extends IByDepartmentIdService<Position, Long>, IService<Position, Long> {
}
