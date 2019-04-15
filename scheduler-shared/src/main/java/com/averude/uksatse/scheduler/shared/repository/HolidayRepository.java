package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import org.springframework.data.repository.CrudRepository;

public interface HolidayRepository extends CrudRepository<Holiday, Long> {
    Iterable<Holiday> findAllByDepartmentId(Long departmentId);
}
