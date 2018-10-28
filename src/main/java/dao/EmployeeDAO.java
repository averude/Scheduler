package dao;

import entity.Employee;

import java.util.Collection;

public interface EmployeeDAO extends GenericDAO<Employee> {
    Collection<Employee> getAllInPosition(long positionId);
    Collection<Employee> getAllInDepartment(long departmentId);
}
