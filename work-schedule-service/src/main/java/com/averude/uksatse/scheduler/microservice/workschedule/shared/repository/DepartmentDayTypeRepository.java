package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

@CacheConfig(cacheNames = "department_day_types")
public interface DepartmentDayTypeRepository extends JpaRepository<DepartmentDayType, Long> {

    @Cacheable(key = "#departmentId")
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.DepartmentDayType.dayType")
    List<DepartmentDayType> findAllByDepartmentId(Long departmentId);

    @Override
    @CacheEvict(key = "#entity.departmentId")
    <S extends DepartmentDayType> S save(S entity);

    @Override
    @CacheEvict(key = "#entity.departmentId")
    void delete(DepartmentDayType entity);
}
