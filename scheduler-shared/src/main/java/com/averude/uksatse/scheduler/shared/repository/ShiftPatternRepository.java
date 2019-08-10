package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.data.repository.CrudRepository;

public interface ShiftPatternRepository extends CrudRepository<ShiftPattern, Long> {
    Iterable<ShiftPattern> findAllByDepartmentId(long departmentId);
}
