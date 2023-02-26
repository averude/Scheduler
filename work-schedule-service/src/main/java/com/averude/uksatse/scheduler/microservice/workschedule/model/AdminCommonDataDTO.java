package com.averude.uksatse.scheduler.microservice.workschedule.model;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class AdminCommonDataDTO {
    private final List<DepartmentDayType> departmentDayTypes;
    private final List<? extends BasicDto<ShiftPattern, PatternUnit>> patternDTOs;
}
