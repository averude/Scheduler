package dao;

import entity.Shift;

import java.util.Collection;

public interface ShiftDAO extends GenericDAO<Shift> {
    Collection<Shift> findAllInDepartment(Long departmentId);
}
