package com.averude.uksatse.scheduler.microservice.workschedule.service.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.CalendarDataDTO;

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
