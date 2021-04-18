package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdAndDateRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkingNormRepository extends IByDepartmentIdAndDateRepository<WorkingNorm, Long> {
    List<WorkingNorm> findAllByShiftIdInAndDateBetweenOrderByDateAsc(List<Long> shiftIds, LocalDate from, LocalDate to);
    List<WorkingNorm> findAllByShiftIdAndDateBetweenOrderByDateAsc(Long shiftId, LocalDate from, LocalDate to);
    void deleteAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to);
}
