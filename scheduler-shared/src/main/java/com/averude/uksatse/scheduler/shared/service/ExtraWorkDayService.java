package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;

import java.time.LocalDate;
import java.util.List;

public interface ExtraWorkDayService extends GenericService<ExtraWorkDay, Long> {
    List<ExtraWorkDay> findAllByDepartmentId(Long departmentId, LocalDate from, LocalDate to);
    List<ExtraWorkDay> findAllByShiftId(Long shiftId, LocalDate from, LocalDate to);
}
