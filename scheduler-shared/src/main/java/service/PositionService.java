package service;

import entity.Position;

public interface PositionService extends GenericService<Position, Long> {
    Iterable<Position> findAllByDepartmentId(Long departmentId);
}
