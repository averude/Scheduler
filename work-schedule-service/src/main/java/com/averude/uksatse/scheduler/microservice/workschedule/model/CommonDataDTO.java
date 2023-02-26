package com.averude.uksatse.scheduler.microservice.workschedule.model;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.core.model.entity.Position;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
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
