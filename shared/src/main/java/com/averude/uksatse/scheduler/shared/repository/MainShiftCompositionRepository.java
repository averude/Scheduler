package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MainShiftCompositionRepository extends JpaRepository<MainShiftComposition, Long> {

    List<MainShiftComposition> findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(Long shiftId,
                                                                                         LocalDate from,
                                                                                         LocalDate to);

    @Query("select msc " +
            "from MainShiftComposition msc " +
            "left join Shift s " +
            "on msc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= msc.to and ?3 >= msc.from ")
    List<MainShiftComposition> findAllByDepartmentIdAndDatesBetween(Long departmentId,
                                                                    LocalDate from,
                                                                    LocalDate to);

    @Query("select msc " +
            "from MainShiftComposition msc " +
            "left join Shift s " +
            "on msc.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= msc.to and ?3 >= msc.from " +
            "order by msc.employeeId asc, msc.shiftId asc, msc.from")
    List<MainShiftComposition> getAllByDepartmentIdAndDateBetweenOrdered(Long departmentId,
                                                                         LocalDate from,
                                                                         LocalDate to);
}
