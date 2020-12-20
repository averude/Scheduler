package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.SubstitutionShiftComposition;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SubstitutionShiftCompositionRepository extends JpaRepository<SubstitutionShiftComposition, Long> {

    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(Long shiftId,
                                                                                                 LocalDate from,
                                                                                                 LocalDate to);

    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> findAllByEmployeeIdInAndToGreaterThanEqualAndFromLessThanEqual(List<Long> employeeIds,
                                                                                                      LocalDate from,
                                                                                                      LocalDate to);

    @Query("select ssc " +
            "from SubstitutionShiftComposition ssc " +
            "left join fetch ssc.employee " +
            "left join Shift s " +
            "on ssc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= ssc.to and ?3 >= ssc.from")
    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> findAllByDepartmentIdAndDatesBetween(Long departmentId,
                                                                            LocalDate from,
                                                                            LocalDate to);

    @Query("select ssc " +
            "from SubstitutionShiftComposition ssc " +
            "left join fetch ssc.employee " +
            "left join MainShiftComposition msc " +
            "on ssc.mainShiftComposition = msc " +
            "where ?2 <= ssc.to and ?3 >= ssc.from and (ssc.shiftId = ?1 or msc.shiftId = ?1)")
    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> findAllByShiftIdAndDatesBetween(Long shiftId,
                                                                       LocalDate from,
                                                                       LocalDate to);
}
