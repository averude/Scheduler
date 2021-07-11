package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPatternGenerationRule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface ShiftPatternGenerationRuleRepository extends JpaRepository<ShiftPatternGenerationRule, Long> {

    void deleteAllByShiftPatternIdAndIdIsNotIn(Long shiftPatternId, List<Long> ids);
    void deleteAllByShiftPatternId(Long shiftPatternId);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.ShiftPatternGenerationRule.useDepartmentDayType")
    List<ShiftPatternGenerationRule> findAllByShiftPatternIdInOrderByShiftPatternIdAscOrderIdAsc(List<Long> shiftPatternIds);
}
