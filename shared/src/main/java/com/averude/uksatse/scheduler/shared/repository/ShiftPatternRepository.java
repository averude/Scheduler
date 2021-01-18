package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ShiftPatternRepository extends IByDepartmentIdRepository<ShiftPattern, Long> {

    @EntityGraph(value = "graph.ShiftPattern.sequence")
    Optional<ShiftPattern> getShiftPatternById(Long id);

    @Query("select sp " +
            "from ShiftPattern sp " +
            "left join Shift s " +
            "on sp.departmentId = s.departmentId " +
            "where s.id = ?1")
    List<ShiftPattern> findAllByShiftId(Long shiftId);
}
