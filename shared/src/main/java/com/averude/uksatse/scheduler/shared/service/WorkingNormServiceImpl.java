package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.shared.repository.WorkingNormRepository;
import com.averude.uksatse.scheduler.shared.repository.common.ShiftRepository;
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

    @Autowired
    public WorkingNormServiceImpl(WorkingNormRepository     workingNormRepository,
                                  ShiftRepository           shiftRepository) {
        super(workingNormRepository, shiftRepository);
        this.workingNormRepository  = workingNormRepository;
        this.shiftRepository        = shiftRepository;
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
}
