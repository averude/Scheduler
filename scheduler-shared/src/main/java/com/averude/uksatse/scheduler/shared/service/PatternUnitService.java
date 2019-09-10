package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;

import java.util.List;

public interface PatternUnitService extends GenericService<PatternUnit, Long> {
    List<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);
}
