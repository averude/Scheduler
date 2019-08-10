package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;

public interface WorkingTimeService extends GenericService<WorkingTime, Long> {
    Iterable<WorkingTime> findAllByDepartmentId(Long departmentId);

    Iterable<WorkingTime> findAllByAuth(Authentication authentication);

    Iterable<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                              LocalDate from,
                                                              LocalDate to);

    Iterable<WorkingTime> findAllByAuthAndDateBetween(Authentication authentication,
                                                      LocalDate from,
                                                      LocalDate to);
}
