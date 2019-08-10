package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;

public interface PatternUnitService extends GenericService<PatternUnit, Long> {
    Iterable<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);
}
