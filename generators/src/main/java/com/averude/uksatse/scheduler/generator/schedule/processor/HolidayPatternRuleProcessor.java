package com.averude.uksatse.scheduler.generator.schedule.processor;

import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.HOLIDAY;

@Component
public class HolidayPatternRuleProcessor extends SpecialCalendarDatePatternRuleProcessor {
    @Override
    public String getType() {
        return HOLIDAY;
    }
}
