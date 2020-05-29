package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdAndDateRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

public abstract class AByDepartmentIdAndDateService<T extends Serializable, ID>
        extends AByDepartmentIdService<T, ID>
        implements IByDepartmentIdAndDateService<T, ID>, IByShiftIdAndDateService<T, ID> {

    private IByDepartmentIdAndDateRepository<T, ID> repository;
    private ShiftRepository                         shiftRepository;

    public AByDepartmentIdAndDateService(IByDepartmentIdAndDateRepository<T, ID> repository,
                                         ShiftRepository shiftRepository) {
        super(repository, shiftRepository);
        this.repository = repository;
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional
    public List<T> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return repository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<T> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to))
                .orElse(Collections.emptyList());
    }
}
