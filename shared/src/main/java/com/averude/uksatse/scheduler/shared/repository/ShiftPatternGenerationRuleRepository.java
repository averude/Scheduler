package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ShiftPatternGenerationRule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftPatternGenerationRuleRepository extends JpaRepository<ShiftPatternGenerationRule, Long> {

    void deleteAllByShiftPatternIdAndIdIsNotIn(Long shiftPatternId, List<Long> ids);
    void deleteAllByShiftPatternId(Long shiftPatternId);

    @EntityGraph(value = "graph.ShiftPatternGenerationRule.useDepartmentDayType")
    List<ShiftPatternGenerationRule> findAllByShiftPatternIdOrderByOrderIdAsc(Long shiftPatternId);
}
