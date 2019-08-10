package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import org.springframework.security.core.Authentication;

public interface PositionService extends GenericService<Position, Long> {
    Iterable<Position> findAllByDepartmentId(Long departmentId);

    Iterable<Position> findAllByAuth(Authentication authentication);
}
