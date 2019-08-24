package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ExtraWeekendRepository extends CrudRepository<ExtraWeekend, Long> {
    Iterable<ExtraWeekend> findAllByDepartmentId(Long departmentId);
    Iterable<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
    Optional<ExtraWeekend> findByHolidayId(Long holidayId);
    Optional<ExtraWeekend> findByDateAndDepartmentId(LocalDate date, Long departmentId);
}
