package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.shared.repository.DayTypeGroupRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DayTypeGroupServiceImpl
        extends AService<DayTypeGroup, Long> implements DayTypeGroupService {

    private final DayTypeGroupRepository dayTypeGroupRepository;

    @Autowired
    public DayTypeGroupServiceImpl(DayTypeGroupRepository dayTypeGroupRepository) {
        super(dayTypeGroupRepository);
        this.dayTypeGroupRepository = dayTypeGroupRepository;
    }
}
