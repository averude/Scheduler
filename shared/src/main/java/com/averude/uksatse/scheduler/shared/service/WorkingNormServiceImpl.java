package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.generator.timenorm.WorkingNormGenerator;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.shared.repository.WorkingNormRepository;
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
public class WorkingNormServiceImpl
        extends AByDepartmentIdAndDateService<WorkingNorm, Long> implements WorkingNormService {

    private final WorkingNormRepository     workingNormRepository;
    private final ShiftRepository           shiftRepository;
    private final ShiftPatternRepository    shiftPatternRepository;
    private final WorkingNormGenerator      workingNormGenerator;

    private final SpecialCalendarDateRepository specialCalendarDateRepository;

    @Autowired
    public WorkingNormServiceImpl(WorkingNormRepository     workingNormRepository,
                                  ShiftRepository           shiftRepository,
                                  ShiftPatternRepository    shiftPatternRepository,
                                  WorkingNormGenerator      workingNormGenerator,
                                  SpecialCalendarDateRepository specialCalendarDateRepository) {
        super(workingNormRepository, shiftRepository);
        this.workingNormRepository  = workingNormRepository;
        this.shiftRepository        = shiftRepository;
        this.workingNormGenerator   = workingNormGenerator;
        this.shiftPatternRepository = shiftPatternRepository;
        this.specialCalendarDateRepository = specialCalendarDateRepository;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public List<? extends BasicDto<Shift, WorkingNorm>> findAllDtoByDepartmentIdAndDate(Long departmentId,
                                                                                        LocalDate from,
                                                                                        LocalDate to) {
        return shiftRepository.findAllByDepartmentId(departmentId)
                .stream()
                .map(shift -> new BasicDto<>(shift, workingNormRepository
                        .findAllByShiftIdAndDateBetweenOrderByDateAsc(shift.getId(), from, to)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void generateWorkingNorm(Long departmentId,
                                    Long shiftId,
                                    LocalDate from,
                                    LocalDate to,
                                    int offset) {
        shiftRepository.findById(shiftId)
                .filter(shift -> shift.getDepartmentId().equals(departmentId)) // make sure that shift is from required department
                .ifPresent(shift -> {
                    var shiftPattern = shiftPatternRepository.getShiftPatternById(shift.getShiftPatternId()).orElseThrow();
                    var specialCalendarDates = specialCalendarDateRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);

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
