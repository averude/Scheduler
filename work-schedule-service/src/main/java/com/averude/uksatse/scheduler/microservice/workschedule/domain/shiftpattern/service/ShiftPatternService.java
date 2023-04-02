package com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.PatternUnit;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.ShiftPattern;

public interface ShiftPatternService extends IByDepartmentIdDtoService<ShiftPattern, PatternUnit, Long>,
        IByDepartmentIdService<ShiftPattern, Long>,
        IDtoService<ShiftPattern, PatternUnit, Long> {
    ShiftPatternDTO saveDTO(ShiftPatternDTO shiftPatternDTO);
}
