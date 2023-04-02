package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.scenario;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.entity.PatternUnit;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.entity.WorkDay;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interval.GenerationInterval;

import java.util.List;

public interface GenerationScenario {
    WorkDay[] generate(GenerationInterval<Long> interval,
                       Long departmentId,
                       List<PatternUnit> sequence,
                       List<WorkDay> existingSchedule);
}
