package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatternUnitRepository extends JpaRepository<PatternUnit, Long> {
    List<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);
}
