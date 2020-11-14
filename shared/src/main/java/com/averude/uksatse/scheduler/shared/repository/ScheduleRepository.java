package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<WorkDay, Long> {
    List<WorkDay> findAllByDepartmentIdAndEmployeeIdAndDateBetweenOrderByDateAsc(long departmentId,
                                                                                 long employeeId,
                                                                                 LocalDate from,
                                                                                 LocalDate to);

    List<WorkDay> findAllByEmployeeIdInAndDateBetweenOrderByDateAsc(List<Long> employeeIds, LocalDate from, LocalDate to);

    void deleteAllByEmployeeIdAndDateBetween(Long employeeId, LocalDate from, LocalDate to);
}
