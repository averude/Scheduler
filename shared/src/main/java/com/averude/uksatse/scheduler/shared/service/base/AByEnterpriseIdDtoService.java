package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class AByEnterpriseIdDtoService<P extends Serializable, C extends Serializable, ID>
        extends AByEnterpriseIdService<P, ID>
        implements IByEnterpriseIdDtoService<P, C, ID>,
        IByDepartmentIdDtoService<P, C, ID>,
        IByShiftIdDtoService<P, C, ID>,
        IDtoService<P, C, ID> {

    private IByEnterpriseIdRepository<P, ID>    parentRepository;
    private IByEnterpriseIdRepository<C, ID>    childRepository;
    private BasicDtoSavingUtil                  basicDtoSavingUtil;

    public AByEnterpriseIdDtoService(IByEnterpriseIdRepository<P, ID> parentRepository,
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
    public List<BasicDto<P, C>> findAllDtoByEnterpriseId(Long enterpriseId) {
        return basicDtoSavingUtil.convertToDto(findAllByEnterpriseId(enterpriseId), this::getChildren);
    }

    @Override
    @Transactional
    public List<? extends BasicDto<P, C>> findAllDtoByDepartmentId(Long departmentId) {
        return basicDtoSavingUtil.convertToDto(findAllByDepartmentId(departmentId), this::getChildren);
    }

    @Override
    @Transactional
    public List<? extends BasicDto<P, C>> findAllDtoByShiftId(Long shiftId) {
        return basicDtoSavingUtil.convertToDto(findAllByShiftId(shiftId), this::getChildren);
    }

    @Override
    @Transactional
    public BasicDto<P, C> saveDto(BasicDto<P, C> dto) {
        return basicDtoSavingUtil.saveDto(dto, parentRepository, childRepository,
                this::removeExcessChildren, this::setChildParentRelation);
    }

    protected abstract List<C> getChildren(P parent);

    protected abstract void setChildParentRelation(P parent, List<C> children);

    protected abstract void removeExcessChildren(P parent, List<C> children);
}
