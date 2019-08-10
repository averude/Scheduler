package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface HolidayRepository extends CrudRepository<Holiday, Long> {
    Iterable<Holiday> findAllByDepartmentId(Long departmentId);
    Optional<Holiday> findByDate(LocalDate date);
    Iterable<Holiday> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
}
