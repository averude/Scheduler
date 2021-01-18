package com.averude.uksatse.scheduler.generator.schedule.scenario;

import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;

import java.util.List;

public interface GenerationScenario {
    WorkDay[] generate(GenerationInterval<Long> interval,
                       Long departmentId,
                       List<PatternUnit> sequence,
                       List<WorkDay> existingSchedule);
}
