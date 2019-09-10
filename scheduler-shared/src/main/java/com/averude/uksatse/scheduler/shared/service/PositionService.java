package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PositionService extends GenericService<Position, Long> {
    List<Position> findAllByDepartmentId(Long departmentId);

    List<Position> findAllByAuth(Authentication authentication);
}
