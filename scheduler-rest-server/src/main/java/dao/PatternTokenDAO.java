package dao;

import entity.PatternToken;

import java.util.Collection;

public interface PatternTokenDAO extends GenericDAO<PatternToken> {
    Collection<PatternToken> findAllInShiftPattern(Long patternId);
}
