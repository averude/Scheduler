package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

public interface DepartmentDayTypeRepository extends IByDepartmentIdRepository<DepartmentDayType, Long> {
    @Override
    @EntityGraph(value = "graph.DepartmentDayType.dayType")
    List<DepartmentDayType> findAllByDepartmentId(Long departmentId);
}
