package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HolidayServiceImpl extends AbstractService<Holiday, Long>
        implements HolidayService {

    private final HolidayRepository holidayRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public HolidayServiceImpl(HolidayRepository holidayRepository,
                              TokenExtraDetailsExtractor detailsExtractor) {
        super(holidayRepository);
        this.holidayRepository = holidayRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<Holiday> findAllByDepartmentId(Long departmentId) {
        return holidayRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<Holiday> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
    }
}
