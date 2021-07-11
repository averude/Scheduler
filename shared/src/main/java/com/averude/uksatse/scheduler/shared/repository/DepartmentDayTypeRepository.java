package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface DepartmentDayTypeRepository extends IByDepartmentIdRepository<DepartmentDayType, Long> {
    @Override
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.DepartmentDayType.dayType")
    List<DepartmentDayType> findAllByDepartmentId(Long departmentId);
}
