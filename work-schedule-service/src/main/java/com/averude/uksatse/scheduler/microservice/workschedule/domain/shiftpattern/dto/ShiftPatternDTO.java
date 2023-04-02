package com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.dto;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.PatternUnit;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.ShiftPattern;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.ShiftPatternGenerationRule;
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
