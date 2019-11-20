package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;

import java.time.LocalDate;
import java.util.List;

public interface ExtraWeekendService extends GenericService<ExtraWeekend, Long> {

    List<ExtraWeekend> findAllByDepartmentId(Long departmentId);

    List<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                           LocalDate from,
                                                           LocalDate to);

    List<ExtraWeekend> findAllByShiftIdAndDateBetween(Long shiftId,
                                                      LocalDate from,
                                                      LocalDate to);
}
