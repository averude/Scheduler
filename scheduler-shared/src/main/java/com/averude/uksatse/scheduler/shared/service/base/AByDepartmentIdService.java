package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdService;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

public class AByDepartmentIdService<T extends Serializable, ID>
        extends AService<T, ID>
        implements IByDepartmentIdService<T, ID>, IByShiftIdService<T, ID> {

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
    public List<T> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(Collections.emptyList());
    }
}
