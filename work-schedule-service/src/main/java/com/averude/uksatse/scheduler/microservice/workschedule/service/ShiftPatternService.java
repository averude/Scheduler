package com.averude.uksatse.scheduler.microservice.workschedule.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.core.model.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;

public interface ShiftPatternService extends IByDepartmentIdDtoService<ShiftPattern, PatternUnit, Long>,
        IByDepartmentIdService<ShiftPattern, Long>,
        IDtoService<ShiftPattern, PatternUnit, Long> {
    ShiftPatternDTO saveDTO(ShiftPatternDTO shiftPatternDTO);
}
