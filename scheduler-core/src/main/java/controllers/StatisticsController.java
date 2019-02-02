package controllers;

import dto.CountDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/api/v1/statistics")
public interface StatisticsController {
    @RequestMapping(method = RequestMethod.GET, value = "/positions/{departmentId}")
    Iterable<CountDTO> getEmployeesCountOnPositionsByDepartmentId(@PathVariable long departmentId);
}
