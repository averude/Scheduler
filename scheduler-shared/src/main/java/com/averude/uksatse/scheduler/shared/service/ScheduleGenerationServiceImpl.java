package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGenerator;
import com.averude.uksatse.scheduler.generator.utils.ScheduleGenerationIntervalCreator;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.SpecialCalendarDateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ScheduleGenerationServiceImpl implements ScheduleGenerationService {

    private final ShiftRepository                   shiftRepository;
    private final ShiftCompositionRepository        shiftCompositionRepository;
    private final ScheduleRepository                scheduleRepository;
    private final SpecialCalendarDateRepository     specialCalendarDateRepository;
    private final ScheduleGenerator                 scheduleGenerator;
    private final ScheduleGenerationIntervalCreator intervalCreator;

    @Autowired
    public ScheduleGenerationServiceImpl(ShiftRepository shiftRepository,
                                         ShiftCompositionRepository shiftCompositionRepository,
                                         ScheduleRepository scheduleRepository,
                                         SpecialCalendarDateRepository specialCalendarDateRepository,
                                         ScheduleGenerator scheduleGenerator,
                                         ScheduleGenerationIntervalCreator intervalCreator) {
        this.shiftRepository = shiftRepository;
        this.shiftCompositionRepository = shiftCompositionRepository;
        this.scheduleRepository = scheduleRepository;
        this.specialCalendarDateRepository = specialCalendarDateRepository;
        this.scheduleGenerator = scheduleGenerator;
        this.intervalCreator = intervalCreator;
    }


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
        var compositions = shiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);

        log.debug("Data for generation:\r\n" +
                "Shift: {}\r\n" +
                "Compositions: {}\r\n" +
                "Special Calendar Days: {}", shift, compositions, specialCalendarDates);

        var workDays = generateSchedule(from, to, offset, shift, compositions, specialCalendarDates);

        log.debug("Saving generated schedule to database...");
        scheduleRepository.saveAll(workDays);
    }

    private List<WorkDay> generateSchedule(LocalDate from,
                                           LocalDate to,
                                           int offset,
                                           Shift shift,
                                           List<ShiftComposition> compositions,
                                           List<SpecialCalendarDate> specialCalendarDates) {
        var result = new ArrayList<WorkDay>();

        for (var composition : compositions) {

            log.debug("Generating schedule for composition {}. ", composition);

            var employeeCompositions = shiftCompositionRepository
                    .findAllByEmployeeIdAndSubstitutionAndToGreaterThanEqualAndFromLessThanEqual(
                            composition.getEmployeeId(),
                            !composition.getSubstitution(),
                            from, to);

            var shiftPattern = shift.getShiftPattern();
            var unitsSize = shiftPattern.getSequence().size();
            var intervals = intervalCreator.getIntervalsForComposition(composition, employeeCompositions, from, to, offset, unitsSize);
            var workDays = generateWorkDaysForIntervals(shiftPattern, specialCalendarDates, intervals);
            result.addAll(workDays);
        }

        return result;
    }

    private List<WorkDay> generateWorkDaysForIntervals(ShiftPattern shiftPattern,
                                                       List<SpecialCalendarDate> specialCalendarDates,
                                                       List<ScheduleGenerationInterval> intervals) {
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

    private List<WorkDay> generateWorkDaysForInterval(ScheduleGenerationInterval interval,
                                                      ShiftPattern pattern,
                                                      List<SpecialCalendarDate> specialCalendarDates) {
        var intervalSchedule = scheduleRepository
                .findAllByEmployeeIdAndDateBetweenOrderByDateAsc(interval.getEmployeeId(), interval.getFrom(), interval.getTo());
        return scheduleGenerator.generate(interval, pattern, intervalSchedule, specialCalendarDates);
    }
}
