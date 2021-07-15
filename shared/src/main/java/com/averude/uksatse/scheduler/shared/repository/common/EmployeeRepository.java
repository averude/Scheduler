package com.averude.uksatse.scheduler.shared.repository.common;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;

import java.util.List;

public interface EmployeeRepository extends IByDepartmentIdRepository<Employee, Long> {

    List<Employee> findAllByDepartmentIdOrderById(Long departmentId);
}
