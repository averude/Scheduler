package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

@CacheConfig(cacheNames = "enterprise_day_types")
public interface DayTypeRepository extends JpaRepository<DayType, Long> {

    @Cacheable(key = "#enterpriseId")
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.DayType.dayTypeGroup")
    List<DayType> findAllByEnterpriseId(Long enterpriseId);

    @Override
    @Caching(evict = {
            @CacheEvict(key = "#entity.enterpriseId"),
            // TODO: improve
            @CacheEvict(value = "department_day_types", allEntries = true)
    })
    <S extends DayType> S save(S entity);

    @Override
    @Caching(evict = {
            @CacheEvict(key = "#entity.enterpriseId"),
            // TODO: improve
            @CacheEvict(value = "department_day_types", allEntries = true)
    })
    void delete(DayType entity);
}
