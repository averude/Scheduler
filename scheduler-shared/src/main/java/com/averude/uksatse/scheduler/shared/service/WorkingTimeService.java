package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;

import java.time.LocalDate;
import java.util.List;

public interface WorkingTimeService extends GenericService<WorkingTime, Long> {
    List<WorkingTime> findAllByDepartmentId(Long departmentId);

    List<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                          LocalDate from,
                                                          LocalDate to);

    List<WorkingTime> findAllByShiftIdAndDateBetween(Long shiftId,
                                                     LocalDate from,
                                                     LocalDate to);
}
