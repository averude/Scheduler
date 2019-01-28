package dao;

import entity.PatternUnit;

import java.util.Collection;

public interface PatternUnitDAO extends GenericDAO<PatternUnit> {
    Collection<PatternUnit> findAllInShiftPattern(Long patternId);
}
