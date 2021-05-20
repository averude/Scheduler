package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public abstract class AByEnterpriseIdDtoService<P extends Serializable, C extends Serializable, ID>
        extends AService<P, ID>
        implements IByEnterpriseIdDtoService<P, C, ID>,
        IByEnterpriseIdService<P, ID>,
        IDtoService<P, C, ID> {

    private IByEnterpriseIdRepository<P, ID>    parentRepository;
    private IByEnterpriseIdRepository<C, ID>    childRepository;
    private BasicDtoSavingUtil                  basicDtoSavingUtil;

    public AByEnterpriseIdDtoService(IByEnterpriseIdRepository<P, ID> parentRepository,
                                     IByEnterpriseIdRepository<C, ID> childRepository,
                                     BasicDtoSavingUtil basicDtoSavingUtil) {
        super(parentRepository);
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
    public List<P> findAllByEnterpriseId(Long enterpriseId) {
        return parentRepository.findAllByEnterpriseId(enterpriseId);
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
