package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.MainComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MainCompositionRepository extends JpaRepository<MainComposition, Long> {

    List<MainComposition> findAllByShiftIdInAndToGreaterThanEqualAndFromLessThanEqualOrderByEmployeeId(List<Long> shiftId,
                                                                                                       LocalDate from,
                                                                                                       LocalDate to);

    @Query("select mc " +
            "from MainComposition mc " +
            "left join Shift s " +
            "on mc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= mc.to and ?3 >= mc.from ")
    List<MainComposition> findAllByDepartmentIdAndDatesBetween(Long departmentId,
                                                               LocalDate from,
                                                               LocalDate to);

    @Query("select mc " +
            "from MainComposition mc " +
            "left join Shift s " +
            "on mc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= mc.to and ?3 >= mc.from " +
            "order by mc.employeeId asc, mc.shiftId asc, mc.from asc")
    List<MainComposition> getAllByDepartmentIdAndDateBetweenOrdered(Long departmentId,
                                                                    LocalDate from,
                                                                    LocalDate to);

    @Query("select mc " +
            "from MainComposition mc " +
            "where mc.shiftId in ?1 and ?2 <= mc.to and ?3 >= mc.from " +
            "order by mc.employeeId asc, mc.shiftId asc, mc.from asc ")
    List<MainComposition> getAllByShiftIdsAndDateBetweenOrdered(List<Long> shiftIds,
                                                                LocalDate from,
                                                                LocalDate to);
}