package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.shared.repository.DayTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType, Long> implements DayTypeService {

    private final DayTypeRepository dayTypeRepository;

    @Autowired
    public DayTypeServiceImpl(DayTypeRepository dayTypeRepository) {
        super(dayTypeRepository);
        this.dayTypeRepository = dayTypeRepository;
    }
}
