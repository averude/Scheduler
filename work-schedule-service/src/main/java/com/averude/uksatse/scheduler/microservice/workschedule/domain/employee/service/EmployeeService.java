package com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.entity.Employee;

public interface EmployeeService extends IByDepartmentIdService<Employee, Long>, IService<Employee, Long> {
}
