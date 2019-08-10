package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.DayTypeGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface DayTypeGroupRepository extends CrudRepository<DayTypeGroup, Long> {
}
