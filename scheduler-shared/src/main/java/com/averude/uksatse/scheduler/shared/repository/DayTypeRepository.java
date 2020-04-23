package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.DayType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayTypeRepository extends JpaRepository<DayType, Long> {
    List<DayType> findAllByEnterpriseId(Long enterpriseId);
}
