package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;

import java.util.List;

public interface PatternUnitService extends IService<PatternUnit, Long> {
    List<PatternUnit> findAllByPatternId(long patternId);
}
