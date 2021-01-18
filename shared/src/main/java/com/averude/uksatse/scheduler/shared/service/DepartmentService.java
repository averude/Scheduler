package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.entity.structure.Department;

import java.util.Optional;

public interface DepartmentService extends IByEnterpriseIdService<Department, Long>,
        IService<Department, Long> {
    Optional<Department> findByShiftIt(Long shiftId);
}
