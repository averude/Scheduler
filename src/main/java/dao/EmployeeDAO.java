package dao;

import entity.Employee;

import java.util.Collection;

public interface EmployeeDAO extends GenericDAO<Employee> {
    Collection<Employee> getAllPosition(long positionId);
}
