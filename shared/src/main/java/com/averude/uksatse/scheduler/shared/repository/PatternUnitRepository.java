package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface PatternUnitRepository extends JpaRepository<PatternUnit, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.PatternUnit.dayType")
    List<PatternUnit> findAllByPatternIdInOrderByPatternIdAscOrderIdAsc(List<Long> patternIds);

    void deleteAllByPatternId(Long patternId);
    void deleteAllByPatternIdAndIdIsNotIn(Long patternId, List<Long> ids);
}
