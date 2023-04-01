package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findAllByEnterpriseId(Long enterpriseId);
    boolean existsByEnterpriseIdAndId(Long enterpriseId, Long departmentId);
}
