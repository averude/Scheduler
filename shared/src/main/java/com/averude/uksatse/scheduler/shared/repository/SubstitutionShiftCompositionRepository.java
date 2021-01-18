package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SubstitutionShiftComposition;
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
            "left join Shift s " +
            "on ssc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= ssc.to and ?3 >= ssc.from")
    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> findAllByDepartmentIdAndDatesBetween(Long departmentId,
                                                                            LocalDate from,
                                                                            LocalDate to);

    @Query("select ssc " +
            "from SubstitutionShiftComposition ssc " +
            "left join MainShiftComposition msc " +
            "on ssc.mainShiftComposition = msc " +
            "where ?2 <= ssc.to and ?3 >= ssc.from and (ssc.shiftId = ?1 or msc.shiftId = ?1)")
    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> findAllByShiftIdAndDatesBetween(Long shiftId,
                                                                       LocalDate from,
                                                                       LocalDate to);

    @Query("select ssc " +
            "from SubstitutionShiftComposition ssc " +
            "left join Shift s " +
            "on ssc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= ssc.to and ?3 >= ssc.from " +
            "order by ssc.employeeId asc, ssc.shiftId asc, ssc.from")
    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> getAllByDepartmentIdAndDateBetweenOrdered(Long departmentId,
                                                                                 LocalDate from,
                                                                                 LocalDate to);

    @Query("select ssc " +
            "from SubstitutionShiftComposition as ssc " +
            "where (ssc.shiftId = ?1 or ssc.mainShiftComposition.id in ?2) " +
            "and ?3 <= ssc.to and ?4 >= ssc.from " +
            "order by ssc.employeeId asc, ssc.from asc")
    @EntityGraph(value = "graph.SubstitutionShiftComposition")
    List<SubstitutionShiftComposition> getAllByShiftIdAndMainShiftCompositionInAndDateBetweenOrdered(Long shiftId,
                                                                                                     List<Long> ids,
                                                                                                     LocalDate from,
                                                                                                     LocalDate to);
}
