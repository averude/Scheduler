package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPatternGenerationRule;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;

import java.util.List;
import java.util.Map;

public interface PatternRuleProcessor {
    void process(WorkDay[] workDays,
                 ShiftPatternGenerationRule rule,
                 Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap);

    String getType();

    default boolean checkWorkDay(ShiftPatternGenerationRule rule, WorkDay workDay) {
        return rule.getOnDayTypeId() == null || rule.getOnDayTypeId().equals(workDay.getDayTypeId());
    }
}
