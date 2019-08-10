package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final StatisticsRepository statisticsRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public StatisticsServiceImpl(StatisticsRepository statisticsRepository,
                                 TokenExtraDetailsExtractor detailsExtractor) {
        this.statisticsRepository = statisticsRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId) {
        return statisticsRepository.countEmployeesOnPositionsByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<CountDTO> countEmployeesByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return statisticsRepository.countEmployeesOnPositionsByDepartmentId(departmentId);
    }
}
