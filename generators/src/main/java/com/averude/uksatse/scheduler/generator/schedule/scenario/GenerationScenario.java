package com.averude.uksatse.scheduler.generator.schedule.scenario;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.generator.model.GenerationInterval;

import java.util.List;

public interface GenerationScenario {
    WorkDay[] generate(GenerationInterval<Long> interval,
                       Long departmentId,
                       List<PatternUnit> sequence,
                       List<WorkDay> existingSchedule);
}
