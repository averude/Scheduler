package service;

import entity.ShiftPattern;

public interface ShiftPatternService extends GenericService<ShiftPattern, Long> {
    Iterable<ShiftPattern> findAllByDepartmentId(long departmentId);
}
