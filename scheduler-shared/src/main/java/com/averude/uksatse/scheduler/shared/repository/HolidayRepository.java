package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    List<Holiday> findAllByDepartmentId(Long departmentId);
    Optional<Holiday> findByDate(LocalDate date);
    List<Holiday> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
}
