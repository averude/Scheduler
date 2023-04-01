package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPatternGenerationRule;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.utils.GenerationUtils.getWorkDay;
import static com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.utils.GenerationUtils.updateWorkDay;

@Slf4j
public abstract class SpecialCalendarDatePatternRuleProcessor implements PatternRuleProcessor {

    @Override
    public void process(WorkDay[] workDays,
                        ShiftPatternGenerationRule rule,
                        Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        if (rule == null || !rule.getType().equals(getType())) {
            return;
        }

        var startDate = workDays[0].getDate();

        var specialCalendarDates = specialCalendarDatesMap.get(getType());
        if (specialCalendarDates == null) {
            log.info("No special calendar date with type {} found", getType());
            return;
        }

        for (var specialCalendarDate : specialCalendarDates) {
            var workDay = getWorkDay(startDate, specialCalendarDate, workDays);

            if (workDay == null) {
                continue;
            }

            if (checkWorkDay(rule, workDay)) {
                updateWorkDay(workDay, rule.getUseDepartmentDayType());
            }
        }
    }
}
