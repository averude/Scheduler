package com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.DayTypeRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
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
