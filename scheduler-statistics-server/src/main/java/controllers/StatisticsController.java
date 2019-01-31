package controllers;

import dto.CountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import repository.StatisticsRepository;

@RestController
@RequestMapping("/api/v1/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/positions/{departmentId}")
    public Iterable<CountDTO> getEmployeesCountOnPositionsByDepartmentId(@PathVariable long departmentId) {
        return statisticsRepository.countEmployeesByDepartmentId(departmentId);
    }
}
