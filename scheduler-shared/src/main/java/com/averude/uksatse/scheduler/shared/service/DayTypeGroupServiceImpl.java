package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.shared.repository.DayTypeGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DayTypeGroupServiceImpl
        extends AbstractService<DayTypeGroup, Long> implements DayTypeGroupService {

    private final DayTypeGroupRepository dayTypeGroupRepository;

    @Autowired
    public DayTypeGroupServiceImpl(DayTypeGroupRepository dayTypeGroupRepository) {
        super(dayTypeGroupRepository);
        this.dayTypeGroupRepository = dayTypeGroupRepository;
    }
}
