package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;

public interface ExtraWeekendService extends GenericService<ExtraWeekend, Long> {
    Iterable<ExtraWeekend> findAllByDepartmentId(Long departmentId);

    Iterable<ExtraWeekend> findAllByAuth(Authentication authentication);

    Iterable<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                               LocalDate from,
                                                               LocalDate to);

    Iterable<ExtraWeekend> findAllByAuthAndDateBetween(Authentication authentication,
                                                       LocalDate from,
                                                       LocalDate to);
}
