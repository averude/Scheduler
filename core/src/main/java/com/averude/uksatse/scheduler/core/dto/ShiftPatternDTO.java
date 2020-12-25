package com.averude.uksatse.scheduler.core.dto;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.ShiftPatternGenerationRule;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ShiftPatternDTO extends BasicDto<ShiftPattern, PatternUnit> {
    private List<ShiftPatternGenerationRule> generationRules;
}
