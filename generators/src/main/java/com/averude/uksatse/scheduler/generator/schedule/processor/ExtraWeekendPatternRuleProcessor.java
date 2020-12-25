package com.averude.uksatse.scheduler.generator.schedule.processor;

import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WEEKEND;

@Component
public class ExtraWeekendPatternRuleProcessor extends SpecialCalendarDatePatternRuleProcessor {
    @Override
    public String getType() {
        return EXTRA_WEEKEND;
    }
}
