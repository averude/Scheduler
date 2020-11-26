package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
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
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleGenerationServiceImpl implements ScheduleGenerationService {

    private final ShiftRepository                   shiftRepository;
    private final ScheduleRepository                scheduleRepository;
    private final SpecialCalendarDateRepository     specialCalendarDateRepository;
    private final ScheduleGenerator                 scheduleGenerator;
    private final GenerationIntervalCreator<Employee> intervalCreator;
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
        if (shift.getShiftPattern() == null
                || shift.getShiftPattern().getSequence() == null
                || shift.getShiftPattern().getSequence().isEmpty()) {
            log.error("Shift hasn't pattern to generate the schedule.");
            throw new RuntimeException();
        }

        var specialCalendarDates = specialCalendarDateRepository
                .findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to);

        var mainCompositions = mainShiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);
        var otherShiftsSubstitutionCompositions = substitutionShiftCompositionRepository
                .findAllByEmployeeIdInAndToGreaterThanEqualAndFromLessThanEqual(getEmployeeIds(mainCompositions), from, to);
        var substitutionCompositions = substitutionShiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);

        var workDays = generateWorkDays(shift, mainCompositions, otherShiftsSubstitutionCompositions, substitutionCompositions, from, to, offset, specialCalendarDates);

        log.debug("Saving generated schedule to database...");
        scheduleRepository.saveAll(workDays);
    }

    private List<WorkDay> generateWorkDays(Shift shift,
                                           List<? extends EntityComposition<?, Employee>> mainShiftCompositions,
                                           List<? extends EntityComposition<?, Employee>> otherShiftsCompositions,
                                           List<? extends EntityComposition<?, Employee>> substitutionShiftCompositions,
                                           LocalDate from,
                                           LocalDate to,
                                           int offset,
                                           List<SpecialCalendarDate> specialCalendarDates) {
        var result = new ArrayList<WorkDay>();
        var shiftPattern = shift.getShiftPattern();
        var unitsSize = shiftPattern.getSequence().size();

        for (var mainComposition : mainShiftCompositions) {
            var employee = mainComposition.getSideB();
            var employeeOtherShiftsCompositions = otherShiftsCompositions.stream()
                    .filter(value -> value.getSideB().getId().equals(employee.getId()))
                    .collect(Collectors.toList());
            var intervals = intervalCreator.getIntervalsForMainShift(from, to, employeeOtherShiftsCompositions, employee, unitsSize, offset);
            var days = generateWorkDaysForIntervals(shiftPattern, specialCalendarDates, intervals);
            result.addAll(days);
        }

        for (var substitutionComposition : substitutionShiftCompositions) {
            var interval = intervalCreator.getIntervalForSubstitutionShift(from, to, substitutionComposition, unitsSize, offset);
            var days = generateWorkDaysForIntervals(shiftPattern, specialCalendarDates, Collections.singletonList(interval));
            result.addAll(days);
        }

        return result;
    }

    private List<WorkDay> generateWorkDaysForIntervals(ShiftPattern shiftPattern,
                                                       List<SpecialCalendarDate> specialCalendarDates,
                                                       List<GenerationInterval<Employee>> intervals) {
        var result = new ArrayList<WorkDay>();

        int lastSpecialDateIndex = 0;
        for(var interval : intervals) {

            // Filtering values for interval
            var intervalSpecialCalendarDates = new ArrayList<SpecialCalendarDate>();
            for (int i = lastSpecialDateIndex; i < specialCalendarDates.size(); i++) {
                var specialCalendarDate = specialCalendarDates.get(i);
                var date = specialCalendarDate.getDate();
                if (!(date.isBefore(interval.getFrom()) && date.isAfter(interval.getTo()))) {
                    intervalSpecialCalendarDates.add(specialCalendarDate);
                    lastSpecialDateIndex = i;
                }
                if (date.isAfter(interval.getTo())) {
                    break;
                }
            }

            var workDays = generateWorkDaysForInterval(interval, shiftPattern, intervalSpecialCalendarDates);
            log.trace("Generated for interval {} schedule {} ", interval, workDays);
            result.addAll(workDays);
        }
        return result;
    }

    private List<WorkDay> generateWorkDaysForInterval(GenerationInterval<Employee> interval,
                                                      ShiftPattern pattern,
                                                      List<SpecialCalendarDate> specialCalendarDates) {
        var intervalSchedule = scheduleRepository
                .findAllByDepartmentIdAndEmployeeIdAndDateBetweenOrderByDateAsc(interval.getObject().getDepartmentId(), interval.getObject().getId(), interval.getFrom(), interval.getTo());
        return scheduleGenerator.generate(interval, pattern, intervalSchedule, specialCalendarDates);
    }

    private List<Long> getEmployeeIds(List<MainShiftComposition> mainCompositions) {
        return mainCompositions.stream()
                .map(composition -> composition.getEmployee().getId())
                .distinct()
                .collect(Collectors.toList());
    }
}
