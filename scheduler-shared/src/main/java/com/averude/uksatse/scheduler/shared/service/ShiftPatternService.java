package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;

import java.util.List;

public interface ShiftPatternService extends GenericService<ShiftPattern, Long> {
    List<BasicDto<ShiftPattern, PatternUnit>> findAllDtoByDepartmentId(Long departmentId);
    List<BasicDto<ShiftPattern, PatternUnit>> findAllDtoByShiftId(Long departmentId);
    List<ShiftPattern> findAllByDepartmentId(long departmentId);
    List<ShiftPattern> findAllByShiftId(Long shiftId);
    BasicDto<ShiftPattern, PatternUnit> saveDto(BasicDto<ShiftPattern, PatternUnit> dto);
}
