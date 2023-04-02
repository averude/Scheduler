package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workingnorm.entity.WorkingNorm;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.dto.EmployeeScheduleDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CalendarDataDTO {
    private final List<EmployeeScheduleDTO> schedule;
    private final List<WorkingNorm> workingNorms;
    private final List<SpecialCalendarDate> specialCalendarDates;
}
