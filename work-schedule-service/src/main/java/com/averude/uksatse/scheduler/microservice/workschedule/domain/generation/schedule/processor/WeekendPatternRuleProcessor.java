package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.processor;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.ShiftPatternGenerationRule;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

import static com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.utils.GenerationUtils.updateWorkDay;
import static com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDateType.WEEKEND;

@Component
public class WeekendPatternRuleProcessor implements PatternRuleProcessor {

    @Override
    public void process(WorkDay[] workDays,
                        ShiftPatternGenerationRule rule,
                        Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        if (rule == null || !rule.getType().equals(WEEKEND)) {
            return;
        }

        var startDate = workDays[0].getDate();

        var startDayOfWeek = startDate.getDayOfWeek();
        var startIndex = 6 - startDayOfWeek.getValue();

        //Set weekends
        for (int i = startIndex; i < workDays.length; i += 7) {
            for (int j = i; j < i + 2; j++) {
                if (j >= workDays.length) {
                    break;
                }

                if (j >= 0) {
                    var workDay = workDays[j];
                    if (checkWorkDay(rule, workDay)) {
                        updateWorkDay(workDay, rule.getUseDepartmentDayType());
                    }
                }
            }
        }
    }

    public String getType() {
        return WEEKEND;
    }
}

