package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.Optional;

public interface ShiftPatternRepository extends IByDepartmentIdRepository<ShiftPattern, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.ShiftPattern.sequence")
    Optional<ShiftPattern> getShiftPatternById(Long id);
}
