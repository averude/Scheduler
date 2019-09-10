package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.WorkingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class WorkingTimeServiceImpl extends AbstractService<WorkingTime, Long>
        implements WorkingTimeService {

    private final WorkingTimeRepository workingTimeRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public WorkingTimeServiceImpl(WorkingTimeRepository workingTimeRepository,
                                  TokenExtraDetailsExtractor detailsExtractor) {
        super(workingTimeRepository);
        this.workingTimeRepository = workingTimeRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByDepartmentId(Long departmentId) {
        return workingTimeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return workingTimeRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByAuthAndDateBetween(Authentication authentication, LocalDate from, LocalDate to) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }
}
