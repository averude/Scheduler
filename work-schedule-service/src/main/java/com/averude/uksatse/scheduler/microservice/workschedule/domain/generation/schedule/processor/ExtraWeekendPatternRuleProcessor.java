package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDateType.EXTRA_WEEKEND;

@Component
public class ExtraWeekendPatternRuleProcessor extends SpecialCalendarDatePatternRuleProcessor {
    @Override
    public String getType() {
        return EXTRA_WEEKEND;
    }
}
