package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;

public interface ScheduleRepository extends CrudRepository<WorkDay, Long> {
    Iterable<WorkDay> findAllByEmployeeIdAndDateBetween(long employeeId, LocalDate from, LocalDate to);
    void deleteAllByEmployeeIdAndDateBetween(Long employeeId, LocalDate from, LocalDate to);
}
