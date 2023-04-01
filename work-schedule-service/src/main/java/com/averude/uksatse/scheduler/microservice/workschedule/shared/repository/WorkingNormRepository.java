package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.time.LocalDate;
import java.util.List;

public interface WorkingNormRepository extends JpaRepository<WorkingNorm, Long> {

    @Cacheable(value = "department_working_norm", key = "{#departmentId, #from, #to}")
    List<WorkingNorm> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);

    @Override
    @CacheEvict(value = "department_working_norm", allEntries = true)
    <S extends WorkingNorm> S save(S entity);

    @Override
    @CacheEvict(value = "department_working_norm", allEntries = true)
    void delete(WorkingNorm entity);

    @CacheEvict(value = "department_working_norm", allEntries = true)
    void deleteAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<WorkingNorm> findAllByShiftIdAndDateBetweenOrderByDateAsc(Long shiftId, LocalDate from, LocalDate to);
}
