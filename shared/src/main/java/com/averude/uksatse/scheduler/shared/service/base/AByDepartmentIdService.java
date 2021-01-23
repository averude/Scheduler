package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdsService;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

public class AByDepartmentIdService<T extends Serializable, ID>
        extends AService<T, ID>
        implements IByDepartmentIdService<T, ID>, IByShiftIdsService<T, ID> {

    private IByDepartmentIdRepository<T, ID>    repository;
    private ShiftRepository                     shiftRepository;

    public AByDepartmentIdService(IByDepartmentIdRepository<T, ID> repository,
                                  ShiftRepository shiftRepository) {
        super(repository);
        this.repository = repository;
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional
    public List<T> findAllByDepartmentId(Long departmentId) {
        return repository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<T> findAllByShiftIds(List<Long> shiftIds) {
        if (shiftIds == null || shiftIds.isEmpty()) {
            throw new RuntimeException();
        }

        return shiftRepository.findById(shiftIds.get(0))
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(Collections.emptyList());
    }
}
