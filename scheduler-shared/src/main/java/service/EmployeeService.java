package service;

import entity.Employee;

public interface EmployeeService extends GenericService<Employee, Long>{

    Iterable<Employee> findAllByDepartmentId(long departmentId);

    Iterable<Employee> findAllByPositionId(long positionId);
}
