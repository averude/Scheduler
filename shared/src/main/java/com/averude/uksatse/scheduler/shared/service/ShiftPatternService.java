package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdsDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.core.model.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;

public interface ShiftPatternService extends IByDepartmentIdDtoService<ShiftPattern, PatternUnit, Long>,
        IByShiftIdsDtoService<ShiftPattern, PatternUnit, Long>,
        IDtoService<ShiftPattern, PatternUnit, Long> {
    ShiftPatternDTO saveDTO(ShiftPatternDTO shiftPatternDTO);
}
