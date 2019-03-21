package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface EmployeeService extends GenericService<Employee, Long>{

    Iterable<Employee> findAllByDepartmentId(long departmentId);

    Iterable<Employee> findAllByAuth(Authentication authentication);

    Iterable<Employee> findAllByPositionId(long positionId);

    Optional<Employee> getCurrent(Authentication authentication);
}
