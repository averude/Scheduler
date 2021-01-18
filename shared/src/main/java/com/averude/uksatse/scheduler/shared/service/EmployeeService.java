package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.Employee;

import java.util.List;

public interface EmployeeService extends IByDepartmentIdService<Employee, Long>,
        IByShiftIdAndDateService<Employee, Long>, IService<Employee, Long> {
    List<Employee> findAllByPositionId(Long positionId);
}
