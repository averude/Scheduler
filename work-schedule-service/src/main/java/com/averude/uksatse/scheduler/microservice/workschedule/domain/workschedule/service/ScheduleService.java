package com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.entity.WorkDay;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService extends IService<WorkDay, Long> {

    List<EmployeeScheduleDTO> findAllDTOByDepartmentIdAndDate(Long departmentId,
                                                              LocalDate from,
                                                              LocalDate to);

    List<EmployeeScheduleDTO> findScheduleDTOByShiftIdsAndDate(List<Long> shiftIds,
                                                               LocalDate from,
                                                               LocalDate to);
}
