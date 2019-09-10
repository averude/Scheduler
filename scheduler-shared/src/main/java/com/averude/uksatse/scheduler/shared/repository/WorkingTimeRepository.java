package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkingTimeRepository extends JpaRepository<WorkingTime, Long> {
    List<WorkingTime> findAllByDepartmentId(Long departmentId);
    List<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
}
