package com.averude.uksatse.scheduler.monolith.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;

public interface ReportsService {
    InputStreamResource generateReportByDepartmentId(Long departmentId,
                                                     LocalDate from,
                                                     LocalDate to);

    InputStreamResource generateReportByShiftId(Long shiftId,
                                                LocalDate from,
                                                LocalDate to);

    InputStreamResource generateReportByAuth(Authentication authentication,
                                             LocalDate from,
                                             LocalDate to);
}
