package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDateType.EXTRA_WEEKEND;

@Component
public class ExtraWeekendPatternRuleProcessor extends SpecialCalendarDatePatternRuleProcessor {
    @Override
    public String getType() {
        return EXTRA_WEEKEND;
    }
}
