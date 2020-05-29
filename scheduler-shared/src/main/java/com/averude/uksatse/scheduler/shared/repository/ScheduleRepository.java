package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<WorkDay, Long> {
    List<WorkDay> findAllByEmployeeIdAndDateBetweenOrderByDateAsc(long employeeId, LocalDate from, LocalDate to);

    List<WorkDay> findAllByEmployeeIdInAndDateBetweenOrderByDateAsc(List<Long> employeeIds, LocalDate from, LocalDate to);

    void deleteAllByEmployeeIdAndDateBetween(Long employeeId, LocalDate from, LocalDate to);

    @Modifying
    @Query("update WorkDay as sched set sched.holiday = :holiday " +
            "where sched.employeeId in " +
            "(select emp from Employee emp " +
            "inner join " +
            "Position pos " +
            "on emp.position = pos " +
            "inner join Department dep " +
            "on pos.departmentId = dep.id " +
            "where dep.enterpriseId = :enterpriseId and sched.date = :date)")
    void setHolidayByEnterpriseIdAndDate(@Param("holiday") Boolean isHoliday,
                                         @Param("enterpriseId") Long enterpriseId,
                                         @Param("date") LocalDate date);
}
