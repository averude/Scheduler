package com.averude.uksatse.scheduler.microservice.workschedule.service;

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
    List<EmployeeWorkStatDTO> findAllByShiftIdsAndDateBetween(List<Long> shiftIds,
                                                              LocalDate from,
                                                              LocalDate to,
                                                              String mode);
}
