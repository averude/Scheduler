package com.averude.uksatse.scheduler.generator.schedule.processor;

import com.averude.uksatse.scheduler.core.entity.ShiftPatternGenerationRule;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;

import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.generator.utils.GenerationUtils.getWorkDay;
import static com.averude.uksatse.scheduler.generator.utils.GenerationUtils.updateWorkDay;

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
