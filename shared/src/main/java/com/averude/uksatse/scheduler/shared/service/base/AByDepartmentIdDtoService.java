package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class AByDepartmentIdDtoService<P extends Serializable, C extends Serializable, ID>
        extends AByDepartmentIdService<P, ID>
        implements IByDepartmentIdDtoService<P, C, ID>,
        IByShiftIdDtoService<P, C, ID>,
        IDtoService<P, C, ID> {

    private IByDepartmentIdRepository<P, ID>    parentRepository;
    private JpaRepository<C, ID>                childRepository;
    private BasicDtoSavingUtil                  basicDtoSavingUtil;

    public AByDepartmentIdDtoService(IByDepartmentIdRepository<P, ID> parentRepository,
                                     JpaRepository<C, ID> childRepository,
                                     ShiftRepository shiftRepository,
                                     BasicDtoSavingUtil basicDtoSavingUtil) {
        super(parentRepository, shiftRepository);
        this.parentRepository = parentRepository;
        this.childRepository = childRepository;
        this.basicDtoSavingUtil = basicDtoSavingUtil;
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
