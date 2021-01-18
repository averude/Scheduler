package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatternUnitRepository extends JpaRepository<PatternUnit, Long> {
    @EntityGraph(value = "graph.PatternUnit.dayType")
    List<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);

    void deleteAllByPatternId(Long patternId);
    void deleteAllByPatternIdAndIdIsNotIn(Long patternId, List<Long> ids);
}
