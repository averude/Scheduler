package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPatternGenerationRule;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ShiftPatternDTO extends BasicDto<ShiftPattern, PatternUnit> {
    private List<ShiftPatternGenerationRule> generationRules;

    public ShiftPatternDTO(ShiftPattern parent,
                           List<PatternUnit> collection,
                           List<ShiftPatternGenerationRule> generationRules) {
        super(parent, collection);
        this.generationRules = generationRules;
    }
}
