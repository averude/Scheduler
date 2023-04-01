package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.CalendarDataDTO;

import java.time.LocalDate;
import java.util.List;

public interface CalendarDataService {
    CalendarDataDTO getByDepartmentId(Long enterpriseId,
                                      Long departmentId,
                                      LocalDate from,
                                      LocalDate to);

    CalendarDataDTO getByShiftIds(Long enterpriseId,
                                  Long departmentId,
                                  List<Long> shiftIds,
                                  LocalDate from,
                                  LocalDate to);
}
