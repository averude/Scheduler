package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.entity.Employee;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.position.entity.Position;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.entity.Shift;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CommonDataDTO {
    private final List<DayType> dayTypes;
    private final List<Position> positions;
    private final List<Shift> shifts;
    private final List<Employee> employees;
}
