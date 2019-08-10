package com.averude.uksatse.scheduler.monolith.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.generator.ScheduleGenerator;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.PatternUnitRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
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
    private final ScheduleGenerator scheduleGenerator;

    @Autowired
    public ScheduleGenerationServiceImpl(ShiftRepository shiftRepository,
                                         ScheduleRepository scheduleRepository,
                                         PatternUnitRepository patternUnitRepository,
                                         EmployeeRepository employeeRepository,
                                         ScheduleGenerator scheduleGenerator) {
        this.shiftRepository = shiftRepository;
        this.scheduleRepository = scheduleRepository;
        this.patternUnitRepository = patternUnitRepository;
        this.employeeRepository = employeeRepository;
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
            List<PatternUnit>   patternUnits    = getPatternUnits(shift.getPatternId());
            List<Employee>      employees       = getEmployees(shift.getId());

            for (Employee employee : employees) {
                try {
                    List<WorkDay> existingSchedule = getSchedule(employee.getId(), from, to);
                    List<WorkDay> workDays = scheduleGenerator
                            .generate(patternUnits,
                                    datesList,
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

    private List<WorkDay> getSchedule(Long employeeId, LocalDate from, LocalDate to) {
        return toList(scheduleRepository.findAllByEmployeeIdAndDateBetween(employeeId, from, to));
    }

    private List<LocalDate> getDatesBetween(LocalDate from, LocalDate to) {
        return Stream.iterate(from, date -> date.plusDays(1L))
                .limit(ChronoUnit.DAYS.between(from, to) + 1)
                .collect(Collectors.toList());
    }

    private List<PatternUnit> getPatternUnits(Long patternId) {
        return toList(patternUnitRepository.findAllByPatternIdOrderByOrderId(patternId));
    }

    private List<Employee> getEmployees(Long shiftId) {
        return toList(employeeRepository
                .findAllByShiftIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(shiftId));
    }

    private <T> List<T> toList(final Iterable<T> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }
}
