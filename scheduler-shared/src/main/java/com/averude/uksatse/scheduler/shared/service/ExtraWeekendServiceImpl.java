package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ExtraWeekendServiceImpl extends AbstractService<ExtraWeekend, Long>
        implements ExtraWeekendService {

    private final ExtraWeekendRepository extraWeekendRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public ExtraWeekendServiceImpl(ExtraWeekendRepository extraWeekendRepository,
                                   TokenExtraDetailsExtractor detailsExtractor) {
        super(extraWeekendRepository);
        this.extraWeekendRepository = extraWeekendRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<ExtraWeekend> findAllByDepartmentId(Long departmentId) {
        return extraWeekendRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<ExtraWeekend> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                      LocalDate from,
                                                                      LocalDate to) {
        return extraWeekendRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public Iterable<ExtraWeekend> findAllByAuthAndDateBetween(Authentication authentication,
                                                              LocalDate from,
                                                              LocalDate to) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }
}
