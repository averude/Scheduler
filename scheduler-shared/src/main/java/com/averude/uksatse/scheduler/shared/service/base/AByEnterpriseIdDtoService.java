package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class AByEnterpriseIdDtoService<T extends Serializable, C extends Serializable, ID>
        extends AByEnterpriseIdService<T, ID> implements IByEnterpriseIdDtoService<T, C, ID> {

    private IByEnterpriseIdRepository<T, ID>    parentRepository;
    private IByEnterpriseIdRepository<C, ID>    childRepository;
    private BasicDtoSavingUtil                  basicDtoSavingUtil;

    public AByEnterpriseIdDtoService(IByEnterpriseIdRepository<T, ID> parentRepository,
                                     IByEnterpriseIdRepository<C, ID> childRepository,
                                     DepartmentRepository departmentRepository,
                                     ShiftRepository shiftRepository,
                                     BasicDtoSavingUtil basicDtoSavingUtil) {
        super(parentRepository, departmentRepository, shiftRepository);
        this.parentRepository = parentRepository;
        this.childRepository = childRepository;
        this.basicDtoSavingUtil = basicDtoSavingUtil;
    }

    @Override
    @Transactional
    public List<BasicDto<T, C>> findAllDtoByEnterpriseId(Long enterpriseId) {
        return basicDtoSavingUtil.convertToDto(findAllByEnterpriseId(enterpriseId), this::getChildren);
    }

    @Override
    @Transactional
    public List<BasicDto<T, C>> findAllDtoByDepartmentId(Long departmentId) {
        return basicDtoSavingUtil.convertToDto(findAllByDepartmentId(departmentId), this::getChildren);
    }

    @Override
    @Transactional
    public List<BasicDto<T, C>> findAllDtoByShiftId(Long shiftId) {
        return basicDtoSavingUtil.convertToDto(findAllByShiftId(shiftId), this::getChildren);
    }

    @Override
    @Transactional
    public BasicDto<T, C> saveDto(BasicDto<T, C> dto) {
        return basicDtoSavingUtil.saveDto(dto, parentRepository, childRepository,
                this::removeExcessChildren, this::setChildParentRelation);
    }

    protected abstract List<C> getChildren(T parent);

    protected abstract void setChildParentRelation(T parent, List<C> children);

    protected abstract void removeExcessChildren(T parent, List<C> children);
}
