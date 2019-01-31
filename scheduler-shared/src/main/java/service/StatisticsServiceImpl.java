package service;

import dto.CountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.StatisticsRepository;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsServiceImpl(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    public Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId) {
        return statisticsRepository.countEmployeesByDepartmentId(departmentId);
    }
}
