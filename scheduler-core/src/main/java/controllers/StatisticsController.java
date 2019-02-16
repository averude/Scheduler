package controllers;

import dto.CountDTO;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public interface StatisticsController {
    @RequestMapping(method = RequestMethod.GET, value = "/positions/employees")
    Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(@RequestHeader("Department-ID") Long departmentId);
}
