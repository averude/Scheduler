package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.DayTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType, Long> implements DayTypeService {

    private final DayTypeRepository dayTypeRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public DayTypeServiceImpl(DayTypeRepository dayTypeRepository,
                              TokenExtraDetailsExtractor detailsExtractor) {
        super(dayTypeRepository);
        this.dayTypeRepository = dayTypeRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<DayType> findAllByDepartmentId(Long departmentId) {
        return dayTypeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<DayType> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor.extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
    }
}
