package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;

import java.util.List;

public interface EmployeeRepository extends IByDepartmentIdRepository<Employee, Long> {
    List<Employee> findAllByPositionIdOrderBySecondNameAscFirstNameAscPatronymicAsc(long positionId);
}
