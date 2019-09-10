package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

public interface ExtraWeekendService extends GenericService<ExtraWeekend, Long> {
    List<ExtraWeekend> findAllByDepartmentId(Long departmentId);

    List<ExtraWeekend> findAllByAuth(Authentication authentication);

    List<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                           LocalDate from,
                                                           LocalDate to);

    List<ExtraWeekend> findAllByAuthAndDateBetween(Authentication authentication,
                                                   LocalDate from,
                                                   LocalDate to);
}
