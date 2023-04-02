package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDateType.HOLIDAY;

@Component
public class HolidayPatternRuleProcessor extends SpecialCalendarDatePatternRuleProcessor {
    @Override
    public String getType() {
        return HOLIDAY;
    }
}
