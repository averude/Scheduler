package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.timenorm.WorkingNormGenerator;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.ShiftPatternRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.ShiftRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.WorkingNormRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
@Service
public class WorkingNormGenerationServiceImpl implements WorkingNormGenerationService {

    private final ShiftRepository               shiftRepository;
    private final ShiftPatternRepository        shiftPatternRepository;
    private final SpecialCalendarDateRepository specialCalendarDateRepository;
    private final WorkingNormGenerator          workingNormGenerator;
    private final WorkingNormRepository         workingNormRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void generateWorkingNorm(Long enterpriseId,
                                    Long departmentId,
                                    Long shiftId,
                                    LocalDate from,
                                    LocalDate to,
                                    int offset) {
        shiftRepository.findById(shiftId)
                .filter(shift -> shift.getDepartmentId().equals(departmentId)) // make sure that shift is from required department
                .ifPresent(shift -> {
                    var shiftPattern = shiftPatternRepository.getShiftPatternById(shift.getShiftPatternId()).orElseThrow();
                    var specialCalendarDates = specialCalendarDateRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);

                    log.debug("Generating working norm for shift {} and period between {} and {}", shift, from, to);
                    var workingNormList = workingNormGenerator
                            .calculateWorkingNormForShift(offset, shift, shiftPattern, from, to, specialCalendarDates);

                    log.debug("Removing old working norm...");
                    workingNormRepository.deleteAllByShiftIdAndDateBetween(shiftId, from, to);
                    workingNormRepository.flush();

                    log.debug("Saving new working norm...");
                    workingNormRepository.saveAll(workingNormList);
                });
    }

}
