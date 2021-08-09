package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.DayTypeGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayTypeGroupRepository extends JpaRepository<DayTypeGroup, Long> {
}
