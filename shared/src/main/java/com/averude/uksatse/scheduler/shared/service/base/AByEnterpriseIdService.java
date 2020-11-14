package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdService;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor
public abstract class AByEnterpriseIdService<T extends Serializable, ID>
        extends AService<T, ID>
        implements IByEnterpriseIdService<T, ID>, IByDepartmentIdService<T, ID>, IByShiftIdService<T, ID> {

    private IByEnterpriseIdRepository<T, ID>    repository;
    private DepartmentRepository                departmentRepository;
    private ShiftRepository                     shiftRepository;

    public AByEnterpriseIdService(IByEnterpriseIdRepository<T, ID> repository,
                                  DepartmentRepository departmentRepository,
                                  ShiftRepository shiftRepository) {
        super(repository);
        this.repository = repository;
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional
    public List<T> findAllByEnterpriseId(Long enterpriseId) {
        return repository.findAllByEnterpriseId(enterpriseId);
    }

    @Override
    @Transactional
    public List<T> findAllByDepartmentId(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .map(department -> findAllByEnterpriseId(department.getEnterpriseId()))
                .orElse(Collections.emptyList());
    }

    @Override
    @Transactional
    public List<T> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(Collections.emptyList());
    }
}
