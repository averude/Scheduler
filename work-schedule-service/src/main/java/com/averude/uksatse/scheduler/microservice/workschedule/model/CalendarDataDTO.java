package com.averude.uksatse.scheduler.microservice.workschedule.model;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
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
