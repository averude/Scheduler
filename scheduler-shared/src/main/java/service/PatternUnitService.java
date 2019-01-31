package service;

import entity.PatternUnit;

public interface PatternUnitService extends GenericService<PatternUnit, Long> {
    Iterable<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);
}
