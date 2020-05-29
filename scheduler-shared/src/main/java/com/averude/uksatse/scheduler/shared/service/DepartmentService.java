package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.structure.Department;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.service.IService;

import java.util.Optional;

public interface DepartmentService extends IByEnterpriseIdService<Department, Long>,
        IService<Department, Long> {
    Optional<Department> findByShiftIt(Long shiftId);
}
