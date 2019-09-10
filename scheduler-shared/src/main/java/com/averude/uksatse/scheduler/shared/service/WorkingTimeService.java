package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

public interface WorkingTimeService extends GenericService<WorkingTime, Long> {
    List<WorkingTime> findAllByDepartmentId(Long departmentId);

    List<WorkingTime> findAllByAuth(Authentication authentication);

    List<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                          LocalDate from,
                                                          LocalDate to);

    List<WorkingTime> findAllByAuthAndDateBetween(Authentication authentication,
                                                  LocalDate from,
                                                  LocalDate to);
}
