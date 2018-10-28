package service;

import entity.Employee;

import java.util.Collection;

public interface EmployeeService extends GenericService<Employee>{
    Collection<Employee> findAllInDepartment(long departmentId);
}
