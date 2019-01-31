package service;

import entity.Shift;

public interface ShiftService extends GenericService<Shift, Long> {
    Iterable<Shift> findAllByDepartmentId(long departmentId);
}
