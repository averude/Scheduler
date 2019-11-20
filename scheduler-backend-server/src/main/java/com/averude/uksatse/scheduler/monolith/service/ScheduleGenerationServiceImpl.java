package com.averude.uksatse.scheduler.monolith.service;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGenerator;
import com.averude.uksatse.scheduler.generator.utils.ScheduleGenerationIntervalCreator;
import com.averude.uksatse.scheduler.shared.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleGenerationServiceImpl implements ScheduleGenerationService {

    private Logger logger = LoggerFactory.getLogger(ScheduleGenerationService.class);

    private final ShiftRepository                   shiftRepository;
    private final ShiftCompositionRepository        shiftCompositionRepository;
    private final ScheduleRepository                scheduleRepository;
    private final PatternUnitRepository             patternUnitRepository;
    private final HolidayRepository                 holidayRepository;
    private final ExtraWeekendRepository            extraWeekendRepository;
    private final ScheduleGenerator                 scheduleGenerator;
    private final ScheduleGenerationIntervalCreator intervalCreator;

    @Autowired
    public ScheduleGenerationServiceImpl(ShiftRepository shiftRepository,
                                         ShiftCompositionRepository shiftCompositionRepository,
                                         ScheduleRepository scheduleRepository,
                                         PatternUnitRepository patternUnitRepository,
                                         HolidayRepository holidayRepository,
                                         ExtraWeekendRepository extraWeekendRepository,
                                         ScheduleGenerator scheduleGenerator,
                                         ScheduleGenerationIntervalCreator intervalCreator) {
        this.shiftRepository = shiftRepository;
        this.shiftCompositionRepository = shiftCompositionRepository;
        this.scheduleRepository = scheduleRepository;
        this.patternUnitRepository = patternUnitRepository;
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.scheduleGenerator = scheduleGenerator;
        this.intervalCreator = intervalCreator;
    }


    @Override
    @Transactional
    public void generate(Long shiftId,
                         LocalDate from,
                         LocalDate to,
                         int offset) {
        logger.debug("Starting schedule generation for shift id: " + shiftId +
                " from=" + from + " to=" + to + " with offset=" + offset);

        var shift = shiftRepository.findById(shiftId).orElseThrow();
        var units = patternUnitRepository.findAllByPatternIdOrderByOrderId(shift.getPatternId());
        var holidays        = holidayRepository
                .findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to);
        var compositions = shiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);
        var extraWeekends = extraWeekendRepository
                .findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to);

        var workDays = generateSchedule(from, to, offset, units, holidays, compositions, extraWeekends);

        logger.debug("Saving generated schedule to database...");
        scheduleRepository.saveAll(workDays);
    }

    private List<WorkDay> generateSchedule(LocalDate from,
                                           LocalDate to,
                                           int offset,
                                           List<PatternUnit> units,
                                           List<Holiday> holidays,
                                           List<ShiftComposition> compositions,
                                           List<ExtraWeekend> extraWeekends) {
        var result = new ArrayList<WorkDay>();

        for (var composition : compositions) {

            logger.debug("Generating schedule for composition: " + composition);

            var employeeCompositions = shiftCompositionRepository
                    .findAllByEmployeeIdAndSubstitutionAndToGreaterThanEqualAndFromLessThanEqual(
                            composition.getEmployeeId(),
                            !composition.getSubstitution(),
                            from, to);

            var unitsSize = units.size();
            var intervals = intervalCreator.getIntervalsForComposition(composition, employeeCompositions, from, to, offset, unitsSize);

            for(var interval : intervals) {
                var workDays = generateWorkDaysForInterval(interval, units, holidays, extraWeekends);
                logger.debug("Generated for interval: "
                        + interval
                        + " schedule: "
                        + workDays);
                result.addAll(workDays);
            }
        }

        return result;
    }

    private List<WorkDay> generateWorkDaysForInterval(ScheduleGenerationInterval interval,
                                                      List<PatternUnit> units,
                                                      List<Holiday> holidays,
                                                      List<ExtraWeekend> extraWeekends) {
        var intervalSchedule = scheduleRepository
                .findAllByEmployeeIdAndDateBetweenOrderByDateAsc(interval.getEmployeeId(), interval.getFrom(), interval.getTo());
        logger.debug("Existing schedule: " + intervalSchedule);
        return scheduleGenerator.generate(interval, units, intervalSchedule, holidays, extraWeekends);
    }
}
