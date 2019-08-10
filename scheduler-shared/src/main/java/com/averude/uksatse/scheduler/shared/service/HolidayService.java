package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;

public interface HolidayService extends GenericService<Holiday, Long> {
    Iterable<Holiday> findAllByDepartmentId(Long departmentId);

    Iterable<Holiday> findAllByAuth(Authentication authentication);

    Iterable<Holiday> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                          LocalDate from,
                                                          LocalDate to);

    Iterable<Holiday> findAllByAuthAndDateBetween(Authentication authentication,
                                                  LocalDate from,
                                                  LocalDate to);
}
