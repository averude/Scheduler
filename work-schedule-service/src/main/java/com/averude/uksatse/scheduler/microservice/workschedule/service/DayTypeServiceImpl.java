package com.averude.uksatse.scheduler.microservice.workschedule.service;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.DayTypeRepository;
import com.averude.uksatse.scheduler.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DayTypeServiceImpl
        extends AService<DayType, Long> implements DayTypeService {

    private final DayTypeRepository dayTypeRepository;

    @Autowired
    public DayTypeServiceImpl(DayTypeRepository dayTypeRepository) {
        super(dayTypeRepository);
        this.dayTypeRepository = dayTypeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DayType> findAllByEnterpriseId(Long enterpriseId) {
        return dayTypeRepository.findAllByEnterpriseId(enterpriseId);
    }
}
