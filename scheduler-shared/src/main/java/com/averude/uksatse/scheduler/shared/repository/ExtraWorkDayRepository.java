package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExtraWorkDayRepository extends JpaRepository<ExtraWorkDay, Long> {
    List<ExtraWorkDay> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
}
