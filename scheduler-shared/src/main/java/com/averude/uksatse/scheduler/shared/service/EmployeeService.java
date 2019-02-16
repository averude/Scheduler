package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;

public interface EmployeeService extends GenericService<Employee, Long>{

    Iterable<Employee> findAllByDepartmentId(long departmentId);

    Iterable<Employee> findAllByPositionId(long positionId);
}
