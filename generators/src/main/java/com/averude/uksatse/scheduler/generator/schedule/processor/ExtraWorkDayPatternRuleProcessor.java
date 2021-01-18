package com.averude.uksatse.scheduler.generator.schedule.processor;

import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDateType.EXTRA_WORK_DAY;

@Component
public class ExtraWorkDayPatternRuleProcessor extends SpecialCalendarDatePatternRuleProcessor {
    @Override
    public String getType() {
        return EXTRA_WORK_DAY;
    }
}
