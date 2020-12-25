package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.generator.model.GenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.processor.PatternRuleProcessor;
import com.averude.uksatse.scheduler.generator.schedule.scenario.ExistingScheduleListGenerationScenario;
import com.averude.uksatse.scheduler.generator.schedule.scenario.GenerationScenario;
import com.averude.uksatse.scheduler.generator.schedule.scenario.NoScheduleListGenerationScenario;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    private final Map<String, PatternRuleProcessor> patternRuleProcessorMap;
    private final GenerationScenario noScheduleListGenerationScenario;
    private final GenerationScenario hasExistingScheduleGenerationScenario;

     @Autowired
    public ScheduleGeneratorImpl(@Qualifier("patternRuleProcessorMap")
                                 Map<String, PatternRuleProcessor> patternRuleProcessorMap) {
        this.patternRuleProcessorMap = patternRuleProcessorMap;
        this.noScheduleListGenerationScenario = new NoScheduleListGenerationScenario();
        this.hasExistingScheduleGenerationScenario = new ExistingScheduleListGenerationScenario();
    }

    @Override
    public List<WorkDay> generate(GenerationInterval<Employee> interval,
                                  ShiftPattern pattern,
                                  List<WorkDay> existingSchedule,
                                  Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        WorkDay[] workDays = null;

        if (existingSchedule.isEmpty()) {
            workDays = noScheduleListGenerationScenario.generate(interval, pattern.getSequence(), existingSchedule);
        } else {
            workDays = hasExistingScheduleGenerationScenario.generate(interval, pattern.getSequence(), existingSchedule);
        }

        if (workDays == null) {
            log.warn("Empty workdays array");
            return Collections.emptyList();
        }

        if (patternRuleProcessorMap != null) {
            var generationRules = pattern.getShiftPatternGenerationRules();
            for (var rule : generationRules) {
                var patternRuleProcessor = patternRuleProcessorMap.get(rule.getType());
                if (patternRuleProcessor != null) {
                    patternRuleProcessor.process(workDays, rule, specialCalendarDatesMap);
                } else {
                    log.warn("Unknown PatternRuleProcessor type requested");
                }
            }
        } else {
            log.warn("No PatternRuleProcessor map provided");
        }

        return Arrays.asList(workDays);
    }
}

