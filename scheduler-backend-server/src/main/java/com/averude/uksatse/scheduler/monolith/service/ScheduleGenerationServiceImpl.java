package com.averude.uksatse.scheduler.monolith.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.generator.ScheduleGenerator;
import com.averude.uksatse.scheduler.shared.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class ScheduleGenerationServiceImpl implements ScheduleGenerationService {

    private Logger logger = LoggerFactory.getLogger(ScheduleGenerationService.class);

    private final ShiftRepository shiftRepository;
    private final ScheduleRepository scheduleRepository;
    private final PatternUnitRepository patternUnitRepository;
    private final EmployeeRepository employeeRepository;
    private final HolidayRepository holidayRepository;
    private final ScheduleGenerator scheduleGenerator;

    @Autowired
    public ScheduleGenerationServiceImpl(ShiftRepository shiftRepository,
                                         ScheduleRepository scheduleRepository,
                                         PatternUnitRepository patternUnitRepository,
                                         EmployeeRepository employeeRepository,
                                         HolidayRepository holidayRepository,
                                         ScheduleGenerator scheduleGenerator) {
        this.shiftRepository = shiftRepository;
        this.scheduleRepository = scheduleRepository;
        this.patternUnitRepository = patternUnitRepository;
        this.employeeRepository = employeeRepository;
        this.holidayRepository = holidayRepository;
        this.scheduleGenerator = scheduleGenerator;
    }

    @Override
    @Transactional
    public void generate(Long shiftId,
                         LocalDate from,
                         LocalDate to,
                         int offset) {
        shiftRepository.findById(shiftId).ifPresent(shift -> {
            List<LocalDate>     datesList       = getDatesBetween(from, to);
            List<PatternUnit>   patternUnits    = patternUnitRepository
                    .findAllByPatternIdOrderByOrderId(shift.getPatternId());
            List<Employee> employees       = employeeRepository
                    .findAllByShiftIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(shift.getId());
            List<Holiday> holidays = holidayRepository
                    .findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to);

            for (Employee employee : employees) {
                try {
                    List<WorkDay> existingSchedule = scheduleRepository
                            .findAllByEmployeeIdAndDateBetween(employee.getId(), from, to);
                    List<WorkDay> workDays = scheduleGenerator
                            .generate(patternUnits,
                                    datesList,
                                    holidays,
                                    existingSchedule,
                                    employee.getId(),
                                    offset);
                    scheduleRepository.saveAll(workDays);
                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage());
                    throw e;
                }
            }
        });
    }

    private List<LocalDate> getDatesBetween(LocalDate from, LocalDate to) {
        return Stream.iterate(from, date -> date.plusDays(1L))
                .limit(ChronoUnit.DAYS.between(from, to) + 1)
                .collect(Collectors.toList());
    }
}
