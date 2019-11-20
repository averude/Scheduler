package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeService extends GenericService<Employee, Long>{

    List<Employee> findAllByDepartmentId(long departmentId);

    List<Employee> findAllByShiftIdAndDate(long shiftId, LocalDate from, LocalDate to);

    List<Employee> findAllByPositionId(long positionId);
}
