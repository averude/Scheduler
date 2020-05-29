package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdDtoService;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class AByDepartmentIdDtoService<T extends Serializable, C extends Serializable, ID>
        extends AByDepartmentIdService<T, ID>
        implements IByDepartmentIdDtoService<T, C, ID>, IByShiftIdDtoService<T, C, ID> {

    private IByDepartmentIdRepository<T, ID>    parentRepository;
    private JpaRepository<C, ID>                childRepository;
    private BasicDtoSavingUtil                  basicDtoSavingUtil;

    public AByDepartmentIdDtoService(IByDepartmentIdRepository<T, ID> parentRepository,
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
