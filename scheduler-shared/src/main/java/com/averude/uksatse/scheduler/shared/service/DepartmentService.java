package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;

import java.util.List;

public interface DepartmentService extends GenericService<Department, Long>{
    List<Department> findAllByEnterpriseId(Long enterpriseId);
}
