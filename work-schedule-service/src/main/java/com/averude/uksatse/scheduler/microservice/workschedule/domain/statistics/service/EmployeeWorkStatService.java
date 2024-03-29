package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.dto.EmployeeWorkStatDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeWorkStatService {
    @Transactional
    List<EmployeeWorkStatDTO> findAllByDepartmentIdAndDateBetween(Long enterpriseId,
                                                                  Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to,
                                                                  String mode);

    @Transactional
    List<EmployeeWorkStatDTO> findAllByShiftIdsAndDateBetween(Long enterpriseId,
                                                              List<Long> shiftIds,
                                                              LocalDate from,
                                                              LocalDate to,
                                                              String mode);
}
