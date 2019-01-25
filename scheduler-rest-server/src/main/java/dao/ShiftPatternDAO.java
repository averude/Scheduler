package dao;

import entity.ShiftPattern;

import java.util.Collection;

public interface ShiftPatternDAO extends GenericDAO<ShiftPattern> {
    Collection<ShiftPattern> findAllInDepartment(Long departmentId);
}
