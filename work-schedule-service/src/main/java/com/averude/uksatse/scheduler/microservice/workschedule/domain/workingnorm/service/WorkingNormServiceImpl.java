package com.averude.uksatse.scheduler.microservice.workschedule.domain.workingnorm.service;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.WorkingNormRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class WorkingNormServiceImpl
        extends AService<WorkingNorm, Long> implements WorkingNormService {

    private final WorkingNormRepository     workingNormRepository;
    private final ShiftRepository           shiftRepository;

    @Autowired
    public WorkingNormServiceImpl(WorkingNormRepository workingNormRepository,
                                  ShiftRepository       shiftRepository) {
        super(workingNormRepository);
        this.workingNormRepository  = workingNormRepository;
        this.shiftRepository        = shiftRepository;
    }

    @Override
    @Transactional(readOnly = true)
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
    @Transactional(readOnly = true)
    public List<WorkingNorm> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return workingNormRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }
}
