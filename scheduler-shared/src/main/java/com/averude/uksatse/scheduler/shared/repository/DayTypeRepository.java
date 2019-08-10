package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.DayType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayTypeRepository extends CrudRepository<DayType, Long> {
    Iterable<DayType> findAllByDepartmentId(Long departmentId);
}
