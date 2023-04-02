package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.PatternUnit;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.ShiftPattern;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class AdminCommonDataDTO {
    private final List<DepartmentDayType> departmentDayTypes;
    private final List<? extends BasicDto<ShiftPattern, PatternUnit>> patternDTOs;
}
