package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;

import java.util.List;

public interface ScheduleGenerator {
    List<WorkDay> generate(ScheduleGenerationInterval interval,
                           ShiftPattern pattern,
                           List<WorkDay> existingSchedule,
                           List<Holiday> holidays,
                           List<ExtraWeekend> extraWeekends);
}
