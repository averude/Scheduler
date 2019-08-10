package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;

public interface ScheduleRepository extends CrudRepository<WorkDay, Long> {
    Iterable<WorkDay> findAllByEmployeeIdAndDateBetween(long employeeId, LocalDate from, LocalDate to);
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
    Iterable<WorkDay> findAllByDepartmentIdAndDate(Long departmentId, LocalDate date);
}
