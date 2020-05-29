package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdDtoService;
import com.averude.uksatse.scheduler.core.service.IDtoService;

public interface ShiftPatternService extends IByDepartmentIdDtoService<ShiftPattern, PatternUnit, Long>,
        IByShiftIdDtoService<ShiftPattern, PatternUnit, Long>,
        IDtoService<ShiftPattern, PatternUnit, Long> {
}
