package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.averude.uksatse.scheduler.shared.repository.StatisticsRepository;

@Service
public class StatisticsServiceImpl implements com.averude.uksatse.scheduler.shared.service.StatisticsService {
    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsServiceImpl(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    public Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId) {
        return statisticsRepository.countEmployeesByDepartmentId(departmentId);
    }
}
