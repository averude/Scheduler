package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExtraWeekendRepository extends JpaRepository<ExtraWeekend, Long> {
    List<ExtraWeekend> findAllByDepartmentId(Long departmentId);
    List<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
    Optional<ExtraWeekend> findByHolidayId(Long holidayId);
    Optional<ExtraWeekend> findByDateAndDepartmentId(LocalDate date, Long departmentId);
}
