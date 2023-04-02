package com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumn;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.SummationColumnDayTypeRangeRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.SummationColumnRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.utils.BasicDtoSavingUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SummationColumnServiceImpl
        extends AByEnterpriseIdDtoService<SummationColumn, SummationColumnDayTypeRange, Long> implements SummationColumnService {

    private final SummationColumnDayTypeRangeRepository summationColumnDayTypeRangeRepository;
    private final BasicDtoSavingUtil basicDtoSavingUtil;

    public SummationColumnServiceImpl(SummationColumnRepository repository,
                                      SummationColumnDayTypeRangeRepository summationColumnDayTypeRangeRepository,
                                      BasicDtoSavingUtil basicDtoSavingUtil) {
        super(repository, summationColumnDayTypeRangeRepository, basicDtoSavingUtil);
        this.summationColumnDayTypeRangeRepository = summationColumnDayTypeRangeRepository;
        this.basicDtoSavingUtil = basicDtoSavingUtil;
    }

    @Override
    protected List<SummationColumnDayTypeRange> getChildren(SummationColumn parent) {
        return summationColumnDayTypeRangeRepository.findAllBySummationColumnId(parent.getId());
    }

    @Override
    protected void setChildParentRelation(SummationColumn parent, List<SummationColumnDayTypeRange> children) {
        children.forEach(child -> {
            if (child.getSummationColumnId() == null || child.getSummationColumnId() <= 0) {
                child.setSummationColumnId(parent.getId());
            }
        });
    }

    @Override
    protected void removeExcessChildren(SummationColumn parent, List<SummationColumnDayTypeRange> children) {
        List<Long> ids = basicDtoSavingUtil.getIds(children);
        summationColumnDayTypeRangeRepository.deleteAllBySummationColumnIdAndIdIsNotIn(parent.getId(), ids);
    }
}
