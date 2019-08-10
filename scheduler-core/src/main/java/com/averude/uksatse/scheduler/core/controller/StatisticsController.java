package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public interface StatisticsController {
    @RequestMapping(method = RequestMethod.GET, value = "/positions/employees")
    Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(Authentication authentication) throws Exception;
}
