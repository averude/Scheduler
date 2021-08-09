package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;

public interface DepartmentRepository extends IByEnterpriseIdRepository<Department, Long> {
    boolean existsByEnterpriseIdAndId(Long enterpriseId, Long departmentId);
}
