package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentDayTypeRepository extends JpaRepository<DepartmentDayType, Long> {
    List<DepartmentDayType> findAllByDepartmentId(Long departmentId);
}
