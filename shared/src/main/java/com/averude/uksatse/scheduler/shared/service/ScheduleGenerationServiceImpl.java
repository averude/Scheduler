package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.interfaces.entity.EntityComposition;
import com.averude.uksatse.scheduler.generator.interval.GenerationIntervalCreator;
import com.averude.uksatse.scheduler.generator.model.GenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGenerator;
import com.averude.uksatse.scheduler.shared.repository.*;
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

    private final ShiftRepository                   shiftRepository;
    private final ShiftPatternRepository            shiftPatternRepository;
    private final ScheduleRepository                scheduleRepository;
    private final SpecialCalendarDateRepository     specialCalendarDateRepository;
    private final ScheduleGenerator                 scheduleGenerator;
    private final GenerationIntervalCreator<Long>   intervalCreator;
    private final MainShiftCompositionRepository    mainShiftCompositionRepository;
    private final SubstitutionShiftCompositionRepository substitutionShiftCompositionRepository;

    @Override
    @Transactional
    public void generate(Long shiftId,
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
                .findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to);
        var specialCalendarDatesMap = getSpecialDateMap(specialCalendarDates);

        var mainCompositions = mainShiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);
        var otherShiftsSubstitutionCompositions = substitutionShiftCompositionRepository
                .findAllByEmployeeIdInAndToGreaterThanEqualAndFromLessThanEqual(getEmployeeIds(mainCompositions), from, to);
        var substitutionCompositions = substitutionShiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);

        var workDays = generateWorkDays(shiftPattern, mainCompositions, otherShiftsSubstitutionCompositions, substitutionCompositions, from, to, offset, specialCalendarDatesMap);

        log.debug("Saving generated schedule to database...");
        scheduleRepository.saveAll(workDays);
    }

    private List<WorkDay> generateWorkDays(ShiftPattern shiftPattern,
                                           List<? extends EntityComposition<?, Long>> mainShiftCompositions,
                                           List<? extends EntityComposition<?, Long>> otherShiftsCompositions,
                                           List<? extends EntityComposition<?, Long>> substitutionShiftCompositions,
                                           LocalDate from,
                                           LocalDate to,
                                           int offset,
                                           Map<String, List<SpecialCalendarDate>> specialCalendarDatesMap) {
        var result = new ArrayList<WorkDay>();
        var unitsSize = shiftPattern.getSequence().size();

        for (var mainComposition : mainShiftCompositions) {
            var employeeId = mainComposition.getSideB();
            var employeeOtherShiftsCompositions = otherShiftsCompositions.stream()
                    .filter(value -> value.getSideB().equals(employeeId))
                    .collect(Collectors.toList());
            var intervals = intervalCreator.getIntervalsForMainShift(from, to, employeeOtherShiftsCompositions, employeeId, unitsSize, offset);
            var days = generateWorkDaysForIntervals(shiftPattern, intervals, specialCalendarDatesMap);
            result.addAll(days);
        }

        for (var substitutionComposition : substitutionShiftCompositions) {
            var interval = intervalCreator.getIntervalForSubstitutionShift(from, to, substitutionComposition, unitsSize, offset);
            var days = generateWorkDaysForIntervals(shiftPattern, Collections.singletonList(interval), specialCalendarDatesMap);
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

    private List<Long> getEmployeeIds(List<MainShiftComposition> mainCompositions) {
        return mainCompositions.stream()
                .map(composition -> composition.getEmployeeId())
                .distinct()
                .collect(Collectors.toList());
    }
}
