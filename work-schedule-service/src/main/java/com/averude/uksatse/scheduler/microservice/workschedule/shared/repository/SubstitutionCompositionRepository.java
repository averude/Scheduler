package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.time.LocalDate;
import java.util.List;

public interface SubstitutionCompositionRepository extends JpaRepository<SubstitutionComposition, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(Long shiftId,
                                                                                            LocalDate from,
                                                                                            LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> findAllByEmployeeIdInAndToGreaterThanEqualAndFromLessThanEqual(List<Long> employeeIds,
                                                                                                 LocalDate from,
                                                                                                 LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc " +
            "from SubstitutionComposition sc " +
            "left join MainComposition mc " +
            "on sc.mainComposition = mc " +
            "where ?2 <= sc.to and ?3 >= sc.from and (sc.shiftId in ?1 or mc.shiftId in ?1) " +
            "order by sc.employeeId asc, sc.shiftId asc, sc.positionId asc, sc.from")
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> findAllByShiftIdsAndDatesBetween(List<Long> shiftIds,
                                                                   LocalDate from,
                                                                   LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc " +
            "from SubstitutionComposition sc " +
            "where sc.departmentId = ?1 and ?2 <= sc.to and ?3 >= sc.from " +
            "order by sc.employeeId asc, sc.shiftId asc, sc.positionId asc, sc.from")
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> getAllByDepartmentIdAndDateBetweenOrdered(Long departmentId,
                                                                            LocalDate from,
                                                                            LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc " +
            "from SubstitutionComposition as sc " +
            "where sc.shiftId in ?1 " +
            "and ?2 <= sc.to and ?3 >= sc.from " +
            "order by sc.employeeId asc, sc.from asc")
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> getAllBySubShiftIdsAndDateOrdered(List<Long> shiftIds,
                                                                    LocalDate from,
                                                                    LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc " +
            "from SubstitutionComposition as sc " +
            "where (sc.shiftId in ?1 or sc.mainComposition.id in ?2) " +
            "and ?3 <= sc.to and ?4 >= sc.from " +
            "order by sc.employeeId asc, sc.shiftId asc, sc.positionId asc, sc.from asc")
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> getAllByShiftIdsAndMainShiftCompositionInAndDateBetweenOrdered(List<Long> shiftIds,
                                                                                                 List<Long> ids,
                                                                                                 LocalDate from,
                                                                                                 LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc " +
            "from SubstitutionComposition as sc " +
            "where (sc.shiftId not in ?1 and sc.mainComposition.id in ?2) " +
            "and ?3 <= sc.to and ?4 >= sc.from " +
            "order by sc.employeeId asc, sc.shiftId asc, sc.positionId asc, sc.from asc")
    @EntityGraph(value = "graph.SubstitutionComposition")
    List<SubstitutionComposition> getAllByShiftIdsNotInAndMainShiftCompositionInAndDateBetweenOrdered(List<Long> shiftIds,
                                                                                                      List<Long> ids,
                                                                                                      LocalDate from,
                                                                                                      LocalDate to);
}
