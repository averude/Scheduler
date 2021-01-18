package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;

import java.util.List;
import java.util.Map;

public interface ScheduleGenerator {
    List<WorkDay> generate(GenerationInterval<Long> interval,
                           ShiftPattern pattern,
                           List<WorkDay> existingSchedule,
                           Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap);
}
