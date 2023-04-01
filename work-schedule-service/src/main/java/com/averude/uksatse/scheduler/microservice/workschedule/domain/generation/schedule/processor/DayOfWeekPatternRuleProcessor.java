package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPatternGenerationRule;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDateType.DAY_OF_WEEK;
import static com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.utils.GenerationUtils.updateWorkDay;

@Component
public class DayOfWeekPatternRuleProcessor implements PatternRuleProcessor {

    @Override
    public void process(WorkDay[] workDays,
                        ShiftPatternGenerationRule rule,
                        Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        if (rule == null || !rule.getType().equals(DAY_OF_WEEK)) {
            return;
        }

        var startDate = workDays[0].getDate();

        var startDayOfWeek = startDate.getDayOfWeek();
        var startIndex = getStartIndex(rule.getDayOfWeek(), startDayOfWeek.getValue());

        for (int i = startIndex; i < workDays.length; i += 7) {
            var workDay = workDays[i];
            if (checkWorkDay(rule, workDay)) {
                updateWorkDay(workDay, rule.getUseDepartmentDayType());
            }
        }
    }

    @Override
    public String getType() {
        return DAY_OF_WEEK;
    }

    private int getStartIndex(int dayOfWeek, int startDayOfWeek) {
        if (dayOfWeek >= startDayOfWeek) {
            return dayOfWeek - startDayOfWeek;
        } else {
            return 7 - startDayOfWeek + dayOfWeek;
        }
    }
}
