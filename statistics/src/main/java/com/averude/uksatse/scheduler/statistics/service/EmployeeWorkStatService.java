package com.averude.uksatse.scheduler.statistics.service;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeWorkStatService {
    @Transactional
    List<EmployeeWorkStatDTO> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to,
                                                                  String mode);

    @Transactional
    List<EmployeeWorkStatDTO> findAllByShiftIdAndDateBetween(Long departmentId,
                                                             LocalDate from,
                                                             LocalDate to,
                                                             String mode);
}
