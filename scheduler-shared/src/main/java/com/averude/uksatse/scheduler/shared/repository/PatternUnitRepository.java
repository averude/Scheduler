package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.data.repository.CrudRepository;

public interface PatternUnitRepository extends CrudRepository<PatternUnit, Long> {
    Iterable<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);
}
