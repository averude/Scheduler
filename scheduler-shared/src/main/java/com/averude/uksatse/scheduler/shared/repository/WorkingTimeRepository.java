package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdAndDateRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkingTimeRepository extends IByDepartmentIdAndDateRepository<WorkingTime, Long> {
    List<WorkingTime> findAllByShiftIdAndDateBetweenOrderByDateAsc(Long shiftId, LocalDate from, LocalDate to);
    void deleteAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to);
}
