package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<WorkDay, Long> {
    List<WorkDay> findAllByEmployeeIdAndDateBetweenOrderByDateAsc(long employeeId, LocalDate from, LocalDate to);

    List<WorkDay> findAllByEmployeeIdInAndDateBetweenOrderByDateAsc(List<Long> employeeIds, LocalDate from, LocalDate to);

    void deleteAllByEmployeeIdAndDateBetween(Long employeeId, LocalDate from, LocalDate to);

    @Query("select sched " +
            "from WorkDay sched " +
            "inner join " +
            "Employee emp " +
            "on sched.employeeId = emp.id " +
            "inner join " +
            "Position pos " +
            "on emp.positionId = pos.id " +
            "where pos.departmentId = ?1 and sched.date = ?2")
    List<WorkDay> findAllByDepartmentIdAndDate(Long departmentId, LocalDate date);
}
