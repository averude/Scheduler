package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.generator.timenorm.WorkingTimeNormGenerator;
import com.averude.uksatse.scheduler.shared.repository.*;
import com.averude.uksatse.scheduler.shared.service.base.AByDepartmentIdAndDateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class WorkingTimeServiceImpl
        extends AByDepartmentIdAndDateService<WorkingTime, Long> implements WorkingTimeService {

    private final WorkingTimeRepository     workingTimeRepository;
    private final ShiftRepository           shiftRepository;
    private final WorkingTimeNormGenerator  timeNormGenerator;

    private final DepartmentRepository      departmentRepository;
    private final HolidayRepository         holidayRepository;
    private final ExtraWeekendRepository    extraWeekendRepository;
    private final ExtraWorkDayRepository    extraWorkDayRepository;

    @Autowired
    public WorkingTimeServiceImpl(WorkingTimeRepository     workingTimeRepository,
                                  ShiftRepository           shiftRepository,
                                  WorkingTimeNormGenerator  timeNormGenerator,
                                  DepartmentRepository      departmentRepository,
                                  HolidayRepository         holidayRepository,
                                  ExtraWeekendRepository    extraWeekendRepository,
                                  ExtraWorkDayRepository    extraWorkDayRepository) {
        super(workingTimeRepository, shiftRepository);
        this.workingTimeRepository  = workingTimeRepository;
        this.shiftRepository        = shiftRepository;
        this.timeNormGenerator      = timeNormGenerator;
        this.departmentRepository   = departmentRepository;
        this.holidayRepository      = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraWorkDayRepository = extraWorkDayRepository;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public List<BasicDto<Shift, WorkingTime>> findAllDtoByDepartmentIdAndDate(Long departmentId,
                                                                              LocalDate from,
                                                                              LocalDate to) {
        return shiftRepository.findAllByDepartmentId(departmentId)
                .stream()
                .map(shift -> new BasicDto<>(shift, workingTimeRepository
                        .findAllByShiftIdAndDateBetweenOrderByDateAsc(shift.getId(), from, to)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void generateWorkingTimeNorm(Long departmentId,
                                        Long shiftId,
                                        LocalDate from,
                                        LocalDate to,
                                        int offset) {
        shiftRepository.findById(shiftId)
                .filter(shift -> shift.getDepartmentId().equals(departmentId)) // make sure that shift is from required department
                .ifPresent(shift -> {
                    departmentRepository.findById(departmentId).ifPresent(department -> {
                        var enterpriseId = department.getEnterpriseId();
                        var holidays = holidayRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
                        var extraWeekends = extraWeekendRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
                        var extraWorkDays = extraWorkDayRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);

                        log.debug("Generating time norm for shift {} and period betweeen {} and {}", shift, from, to);
                        var workingTimeList = timeNormGenerator
                                .calculateWorkingTimeForShift(offset, shift, from, to, holidays, extraWeekends, extraWorkDays);

                        log.debug("Removing old working time norm...");
                        workingTimeRepository.deleteAllByShiftIdAndDateBetween(shiftId, from, to);
                        workingTimeRepository.flush();

                        log.debug("Saving new working time norm...");
                        workingTimeRepository.saveAll(workingTimeList);
                    });
                });
    }
}
