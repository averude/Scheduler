package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytypegroup.entity.DayTypeGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayTypeGroupRepository extends JpaRepository<DayTypeGroup, Long> {
}
