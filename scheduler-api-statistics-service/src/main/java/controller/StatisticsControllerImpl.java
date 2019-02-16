package controller;

import controllers.StatisticsController;
import dto.CountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repository.StatisticsRepository;

@RestController
public class StatisticsControllerImpl implements StatisticsController {

    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StatisticsControllerImpl(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET, value = "/positions/employees")
    public Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(@RequestHeader("Department-ID") Long departmentId) {
        return statisticsRepository.countEmployeesByDepartmentId(departmentId);
    }
}
