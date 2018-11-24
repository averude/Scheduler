package dao;

import entity.DayType;

import java.util.List;

public interface DayTypeDAO extends GenericDAO<DayType> {
    List<DayType> findByEmployeeId(long employeeId);
}
