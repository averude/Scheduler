package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.ShiftPattern;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.entity.WorkDay;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interval.GenerationInterval;

import java.util.List;
import java.util.Map;

public interface ScheduleGenerator {
    List<WorkDay> generate(GenerationInterval<Long> interval,
                           ShiftPattern pattern,
                           List<WorkDay> existingSchedule,
                           Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap);
}
