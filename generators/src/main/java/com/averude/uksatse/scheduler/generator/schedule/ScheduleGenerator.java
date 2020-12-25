package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.generator.model.GenerationInterval;

import java.util.List;
import java.util.Map;

public interface ScheduleGenerator {
    List<WorkDay> generate(GenerationInterval<Employee> interval,
                           ShiftPattern pattern,
                           List<WorkDay> existingSchedule,
                           Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap);
}
