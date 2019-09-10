package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

public interface EmployeeService extends GenericService<Employee, Long>{

    List<Employee> findAllByAuth(Authentication authentication);

    List<Employee> findAllByDepartmentId(long departmentId);

    List<Employee> findAllByShiftId(long shiftId);

    List<Employee> findAllByPositionId(long positionId);

    Optional<Employee> getCurrent(Authentication authentication);
}
