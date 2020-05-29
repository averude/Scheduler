package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IService;

import java.util.List;

public interface EmployeeService extends IByDepartmentIdService<Employee, Long>,
        IByShiftIdAndDateService<Employee, Long>, IService<Employee, Long> {
    List<Employee> findAllByPositionId(Long positionId);
}
