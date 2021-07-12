package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.dto.CountDTO;
import com.averude.uksatse.scheduler.shared.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsServiceImpl(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    // TODO: Remove
    @Override
    @Transactional
    public List<CountDTO> countEmployeesByDepartmentId(Long departmentId) {
        return statisticsRepository.countEmployeesOnPositionsByDepartmentId(departmentId);
    }
}
