package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.data.repository.CrudRepository;

public interface WorkingTimeRepository extends CrudRepository<WorkingTime, Long> {
    Iterable<WorkingTime> findAllByDepartmentId(Long departmentId);
}
