package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor
public abstract class AByEnterpriseIdAndDateService<T extends Serializable, ID>
        extends AByEnterpriseIdService<T, ID>
        implements IByEnterpriseIdAndDateService<T, ID>, IByDepartmentIdAndDateService<T, ID>, IByShiftIdAndDateService<T, ID> {

    private IByEnterpriseIdAndDateRepository<T, ID> repository;
    private DepartmentRepository                    departmentRepository;
    private ShiftRepository                         shiftRepository;

    public AByEnterpriseIdAndDateService(IByEnterpriseIdAndDateRepository<T, ID> repository,
                                         DepartmentRepository departmentRepository,
                                         ShiftRepository shiftRepository) {
        super(repository, departmentRepository, shiftRepository);
        this.repository = repository;
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional
    public List<T> findAllByEnterpriseIdAndDateBetween(Long enterpriseId,
                                                LocalDate from,
                                                LocalDate to) {
        return repository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
    }

    @Override
    @Transactional
    public List<T> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                LocalDate from,
                                                LocalDate to) {
        return departmentRepository.findById(departmentId)
                .map(department -> findAllByEnterpriseIdAndDateBetween(department.getEnterpriseId(), from, to))
                .orElse(Collections.emptyList());
    }

    @Override
    @Transactional
    public List<T> findAllByShiftIdAndDateBetween(Long shiftId,
                                           LocalDate from,
                                           LocalDate to) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to))
                .orElse(Collections.emptyList());
    }

}