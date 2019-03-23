package com.averude.uksatse.scheduler.core.generator;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleGenerator {
    List<WorkDay> generate(List<PatternUnit> patternUnits,
                           List<LocalDate> dates,
                           List<WorkDay> existingSchedule,
                           long employeeId,
                           int offset);
}
