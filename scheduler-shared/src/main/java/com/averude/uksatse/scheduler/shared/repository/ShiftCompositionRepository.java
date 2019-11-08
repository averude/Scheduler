package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ShiftCompositionRepository extends JpaRepository<ShiftComposition, Long> {
    List<ShiftComposition> findAllByShiftId(Long shiftId);

    List<ShiftComposition> findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(Long shiftId,
                                                                                     LocalDate from,
                                                                                     LocalDate to);

    @Query("select e " +
            "from ShiftComposition se " +
            "left join Employee e " +
            "on se.employeeId = e.id " +
            "where se.shiftId = ?1 "+
            "order by se.shiftId , e.secondName, e.firstName, e.patronymic")
    List<Employee> findAllEmployeesByShiftId(Long shiftId);

    @Query("select e " +
            "from ShiftComposition se " +
            "left join Employee e " +
            "on se.employeeId = e.id " +
            "where se.shiftId = ?1 and ?2 <= se.to and ?3 >= se.from " +
            "order by se.shiftId , e.secondName, e.firstName, e.patronymic")
    List<Employee> findEmployeesByShiftIdAndDatesBetween(Long shiftId,
                                                         LocalDate from,
                                                         LocalDate to);
}
