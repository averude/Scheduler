package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.Position;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

@CacheConfig(cacheNames = "department_positions")
public interface PositionRepository extends JpaRepository<Position, Long> {

    @Cacheable(key = "#departmentId")
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<Position> findAllByDepartmentId(Long departmentId);

    @Override
    @CacheEvict(key = "#entity.departmentId")
    <S extends Position> S save(S entity);

    @Override
    @CacheEvict(key = "#entity.departmentId")
    void delete(Position entity);
}
