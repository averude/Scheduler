package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleView;
import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleViewDayType;
import com.averude.uksatse.scheduler.shared.repository.WorkScheduleViewDayTypeRepository;
import com.averude.uksatse.scheduler.shared.repository.WorkScheduleViewRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkScheduleViewServiceImpl
        extends AService<WorkScheduleView, Long>
        implements WorkScheduleViewService {

    private final WorkScheduleViewRepository        workScheduleViewRepository;
    private final WorkScheduleViewDayTypeRepository workScheduleViewDayTypeRepository;

    public WorkScheduleViewServiceImpl(WorkScheduleViewRepository workScheduleViewRepository,
                                       WorkScheduleViewDayTypeRepository workScheduleViewDayTypeRepository) {
        super(workScheduleViewRepository);
        this.workScheduleViewRepository = workScheduleViewRepository;
        this.workScheduleViewDayTypeRepository = workScheduleViewDayTypeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BasicDto<WorkScheduleView, Long>> findAllDtoByEnterpriseId(Long enterpriseId) {
        return workScheduleViewRepository.findAllByEnterpriseId(enterpriseId)
                .stream()
                .map(view -> new BasicDto<>(view, view.getViewDayTypes()
                        .stream()
                        .map(WorkScheduleViewDayType::getDayTypeId)
                        .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkScheduleView> findAllByEnterpriseId(Long enterpriseId) {
        return workScheduleViewRepository.getAllByEnterpriseId(enterpriseId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkScheduleView> findAllByDepartmentId(Long departmentId) {
        return workScheduleViewRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public BasicDto<WorkScheduleView, Long> saveDto(@Valid BasicDto<WorkScheduleView, Long> dto) {
        WorkScheduleView view = dto.getParent();
        if (view.getId() == null) {
            workScheduleViewRepository.save(view);
        }

        List<Long> dayTypeIds = dto.getCollection();

        var scheduleViewDayTypes = dayTypeIds.stream()
                .map(dayTypeId -> new WorkScheduleViewDayType(view.getId(), dayTypeId))
                .collect(Collectors.toList());

        workScheduleViewDayTypeRepository.deleteAllByWorkScheduleViewIdAndDayTypeIdNotIn(view.getId(), dayTypeIds);
        workScheduleViewDayTypeRepository.saveAll(scheduleViewDayTypes);

        return dto;
    }
}
