package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.shared.repository.common.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdAndDateRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

public abstract class AByDepartmentIdAndDateService<T extends Serializable, ID>
        extends AService<T, ID>
        implements IByDepartmentIdAndDateService<T, ID>, IByShiftIdAndDateService<T, ID> {

    private IByDepartmentIdAndDateRepository<T, ID> repository;
    private ShiftRepository                         shiftRepository;

    public AByDepartmentIdAndDateService(IByDepartmentIdAndDateRepository<T, ID> repository,
                                         ShiftRepository shiftRepository) {
        super(repository);
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
    public List<T> findAllByShiftIdsAndDateBetween(List<Long> shiftIds, LocalDate from, LocalDate to) {
        if (shiftIds == null || shiftIds.isEmpty()) {
            throw new RuntimeException();
        }

        return shiftRepository.findById(shiftIds.get(0))
                .map(shift -> findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to))
                .orElse(Collections.emptyList());
    }
}
