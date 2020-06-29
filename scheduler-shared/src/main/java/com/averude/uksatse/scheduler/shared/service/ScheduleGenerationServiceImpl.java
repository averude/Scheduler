package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
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
    private final HolidayRepository                 holidayRepository;
    private final ExtraWeekendRepository            extraWeekendRepository;
    private final ExtraWorkDayRepository            extraWorkDayRepository;
    private final ScheduleGenerator                 scheduleGenerator;
    private final ScheduleGenerationIntervalCreator intervalCreator;

    @Autowired
    public ScheduleGenerationServiceImpl(ShiftRepository shiftRepository,
                                         ShiftCompositionRepository shiftCompositionRepository,
                                         ScheduleRepository scheduleRepository,
                                         HolidayRepository holidayRepository,
                                         ExtraWeekendRepository extraWeekendRepository,
                                         ExtraWorkDayRepository extraWorkDayRepository,
                                         ScheduleGenerator scheduleGenerator,
                                         ScheduleGenerationIntervalCreator intervalCreator) {
        this.shiftRepository = shiftRepository;
        this.shiftCompositionRepository = shiftCompositionRepository;
        this.scheduleRepository = scheduleRepository;
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraWorkDayRepository = extraWorkDayRepository;
        this.scheduleGenerator = scheduleGenerator;
        this.intervalCreator = intervalCreator;
    }


    @Override
    @Transactional
    public void generate(Long shiftId,
                         LocalDate from,
                         LocalDate to,
                         int offset) {
        logger.debug("Starting schedule generation for shift id={} from={} to={} with offset={}", shiftId, from, to, offset);

        var shift = shiftRepository.findById(shiftId).orElseThrow();
        var holidays        = holidayRepository
                .findAllByEnterpriseIdAndDateBetween(shift.getDepartmentId(), from, to);
        var compositions = shiftCompositionRepository
                .findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);
        var extraWeekends = extraWeekendRepository
                .findAllByEnterpriseIdAndDateBetween(shift.getDepartmentId(), from, to);
        var extraWorkDays = extraWorkDayRepository
                .findAllByEnterpriseIdAndDateBetween(shift.getDepartmentId(), from, to);

        logger.debug("Data for generation:\r\n" +
                "Shift:         {}\r\n" +
                "Compositions:  {}\r\n" +
                "Holidays:      {}\r\n" +
                "ExtraWeekends: {}\r\n" +
                "ExtraWorkDays: {}", shift, compositions, holidays, extraWeekends, extraWorkDays);

        var workDays = generateSchedule(from, to, offset, shift, holidays, compositions, extraWeekends, extraWorkDays);

        logger.debug("Saving generated schedule to database...");
        scheduleRepository.saveAll(workDays);
    }

    private List<WorkDay> generateSchedule(LocalDate from,
                                           LocalDate to,
                                           int offset,
                                           Shift shift,
                                           List<Holiday> holidays,
                                           List<ShiftComposition> compositions,
                                           List<ExtraWeekend> extraWeekends,
                                           List<ExtraWorkDay> extraWorkDays) {
        var result = new ArrayList<WorkDay>();

        for (var composition : compositions) {

            logger.debug("Generating schedule for composition {}. ", composition);

            var employeeCompositions = shiftCompositionRepository
                    .findAllByEmployeeIdAndSubstitutionAndToGreaterThanEqualAndFromLessThanEqual(
                            composition.getEmployeeId(),
                            !composition.getSubstitution(),
                            from, to);

            var shiftPattern = shift.getShiftPattern();
            var unitsSize = shiftPattern.getSequence().size();
            var intervals = intervalCreator.getIntervalsForComposition(composition, employeeCompositions, from, to, offset, unitsSize);

            for(var interval : intervals) {
                var workDays = generateWorkDaysForInterval(interval, shiftPattern, holidays, extraWeekends, extraWorkDays);
                logger.trace("Generated for interval {} schedule {} ", interval, workDays);
                result.addAll(workDays);
            }
        }

        return result;
    }

    private List<WorkDay> generateWorkDaysForInterval(ScheduleGenerationInterval interval,
                                                      ShiftPattern pattern,
                                                      List<Holiday> holidays,
                                                      List<ExtraWeekend> extraWeekends,
                                                      List<ExtraWorkDay> extraWorkDays) {
        var intervalSchedule = scheduleRepository
                .findAllByEmployeeIdAndDateBetweenOrderByDateAsc(interval.getEmployeeId(), interval.getFrom(), interval.getTo());
        logger.debug("Existing schedule {}", intervalSchedule);
        return scheduleGenerator.generate(interval, pattern, intervalSchedule, holidays, extraWeekends, extraWorkDays);
    }
}
