package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;

public interface PositionService extends GenericService<Position, Long> {
    Iterable<Position> findAllByDepartmentId(Long departmentId);
}
