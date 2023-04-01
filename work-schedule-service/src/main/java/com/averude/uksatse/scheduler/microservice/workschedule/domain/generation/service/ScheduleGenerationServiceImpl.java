package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.service;

import com.averude.uksatse.scheduler.core.creator.GenerationIntervalCreator;
import com.averude.uksatse.scheduler.core.interfaces.entity.Composition;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;
import com.averude.uksatse.scheduler.core.util.OffsetCalculator;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.schedule.ScheduleGenerator;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.core.util.SpecialCalendarDateUtil.getSpecialDateMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleGenerationServiceImpl implements ScheduleGenerationService {

    private final OffsetCalculator                  offsetCalculator;
    private final ShiftRepository                   shiftRepository;
    private final ShiftPatternRepository            shiftPatternRepository;
    private final ScheduleRepository                scheduleRepository;
    private final SpecialCalendarDateRepository     specialCalendarDateRepository;
    private final ScheduleGenerator                 scheduleGenerator;
    private final GenerationIntervalCreator<Long>   intervalCreator;
    private final MainCompositionRepository         mainCompositionRepository;
    private final SubstitutionCompositionRepository substitutionCompositionRepository;

    @Override
    @Transactional
    public void generate(Long enterpriseId,
                         Long shiftId,
                         LocalDate from,
                         LocalDate to,
                         int offset) {
        log.debug("Starting schedule generation for shift id={} from={} to={} with offset={}", shiftId, from, to, offset);

        var shift = shiftRepository.findById(shiftId).orElseThrow();
        var shiftPattern = shiftPatternRepository.getShiftPatternById(shift.getShiftPatternId()).orElseThrow();

        if (shiftPattern.getSequence() == null || shiftPattern.getSequence().isEmpty()) {
            log.error("Shift hasn't pattern to generate the schedule.");
            throw new RuntimeException();
        }

        var specialCalendarDates = specialCalendarDateRepository
                .findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
        var specialCalendarDatesMap = getSpecialDateMap(specialCalendarDates);

        var mainCompositions = mainCompositionRepository
                .findAllByShiftIdInAndToGreaterThanEqualAndFromLessThanEqualOrderByEmployeeId(Collections.singletonList(shiftId), from, to);
        var otherShiftsSubstitutionCompositions = substitutionCompositionRepository
                .findAllByEmployeeIdInAndToGreaterThanEqualAndFromLessThanEqual(getEmployeeIds(mainCompositions), from, to);
        var substitutionCompositions = substitutionCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);

        var workDays = generateWorkDays(shiftPattern, mainCompositions, otherShiftsSubstitutionCompositions, substitutionCompositions, from, to, offset, specialCalendarDatesMap);

        log.debug("Saving generated schedule to database...");
        scheduleRepository.saveAll(workDays);
    }

    private List<WorkDay> generateWorkDays(ShiftPattern shiftPattern,
                                           List<? extends Composition> mainShiftCompositions,
                                           List<? extends Composition> otherShiftsCompositions,
                                           List<? extends Composition> substitutionShiftCompositions,
                                           LocalDate from,
                                           LocalDate to,
                                           int offset,
                                           Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        var result = new ArrayList<WorkDay>();
        var unitsSize = shiftPattern.getSequence().size();

        for (var mainComposition : mainShiftCompositions) {
            var employeeId = mainComposition.getEmployeeId();
            var employeeOtherShiftsCompositions = otherShiftsCompositions.stream()
                    .filter(value -> value.getEmployeeId().equals(employeeId))
                    .collect(Collectors.toList());

            var intervals = intervalCreator.createMainIntervals(from, to, mainComposition, employeeOtherShiftsCompositions,
                    (interval) -> {
                interval.setObject(employeeId);
                interval.setOffset(offsetCalculator.recalculateForDate(from, interval.getFrom(), unitsSize, offset));
            });
            var days = generateWorkDaysForIntervals(shiftPattern, intervals, specialCalendarDatesMap);
            result.addAll(days);
        }

        for (var substitutionComposition : substitutionShiftCompositions) {
            var generationInterval = intervalCreator.createSubstitutionInterval(from, to, substitutionComposition, (interval) -> {
                interval.setObject(substitutionComposition.getEmployeeId());
                interval.setOffset(offsetCalculator.recalculateForDate(from, interval.getFrom(), unitsSize, offset));
            });
            var days = generateWorkDaysForIntervals(shiftPattern, Collections.singletonList(generationInterval), specialCalendarDatesMap);
            result.addAll(days);
        }

        return result;
    }

    private List<WorkDay> generateWorkDaysForIntervals(ShiftPattern shiftPattern,
                                                       List<GenerationInterval<Long>> intervals,
                                                       Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        var result = new ArrayList<WorkDay>();

        for(var interval : intervals) {

            var workDays = generateWorkDaysForInterval(interval, shiftPattern, specialCalendarDatesMap);
            log.trace("Generated for interval {} schedule {} ", interval, workDays);
            result.addAll(workDays);
        }
        return result;
    }

    private List<WorkDay> generateWorkDaysForInterval(GenerationInterval<Long> interval,
                                                      ShiftPattern pattern,
                                                      Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        var intervalSchedule = scheduleRepository
                .findAllByDepartmentIdAndEmployeeIdAndDateBetweenOrderByDateAsc(pattern.getDepartmentId(), interval.getObject(), interval.getFrom(), interval.getTo());
        return scheduleGenerator.generate(interval, pattern, intervalSchedule, specialCalendarDatesMap);
    }

    private List<Long> getEmployeeIds(List<? extends Composition> compositions) {
        return compositions.stream()
                .map(Composition::getEmployeeId)
                .distinct()
                .collect(Collectors.toList());
    }
}
