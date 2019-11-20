package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;

import java.time.LocalDate;
import java.util.List;

public interface HolidayService extends GenericService<Holiday, Long> {
    List<Holiday> findAllByDepartmentId(Long departmentId);

    List<Holiday> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                      LocalDate from,
                                                      LocalDate to);

    List<Holiday> findAllByShiftIdAndDateBetween(Long shiftId,
                                                 LocalDate from,
                                                 LocalDate to);
}
