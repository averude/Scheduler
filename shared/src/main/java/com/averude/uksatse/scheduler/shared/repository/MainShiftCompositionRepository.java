package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MainShiftCompositionRepository extends JpaRepository<MainShiftComposition, Long> {
    List<MainShiftComposition> findAllByShiftId(Long shiftId);

    List<MainShiftComposition> findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(Long shiftId,
                                                                                         LocalDate from,
                                                                                         LocalDate to);

    List<MainShiftComposition> findAllByEmployeeIdAndToGreaterThanEqualAndFromLessThanEqual(Long employeeId,
                                                                                            LocalDate from,
                                                                                            LocalDate to);


    List<MainShiftComposition> findAllByEmployeeIdInAndToGreaterThanEqualAndFromLessThanEqual(List<Long> employeeIds,
                                                                                              LocalDate from,
                                                                                              LocalDate to);

    @Query("select se " +
            "from MainShiftComposition se " +
            "left join Shift s " +
            "on se.shiftId = s.id " +
            "where s.departmentId = ?1 and ?2 <= se.to and ?3 >= se.from")
    List<MainShiftComposition> findAllByDepartmentIdAndDatesBetween(Long departmentId,
                                                                    LocalDate from,
                                                                    LocalDate to);

    @Query("select e " +
            "from MainShiftComposition se " +
            "left join Employee e " +
            "on se.employee = e " +
            "where se.shiftId = ?1 "+
            "order by se.shiftId , e.secondName, e.firstName, e.patronymic")
    List<Employee> findAllEmployeesByShiftId(Long shiftId);

    @Query("select e " +
            "from MainShiftComposition se " +
            "left join Employee e " +
            "on se.employee = e " +
            "where se.shiftId = ?1 and ?2 <= se.to and ?3 >= se.from " +
            "order by se.shiftId , e.secondName, e.firstName, e.patronymic")
    List<Employee> findEmployeesByShiftIdAndDatesBetween(Long shiftId,
                                                         LocalDate from,
                                                         LocalDate to);
}
