package com.averude.uksatse.scheduler.microservice.statistics.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.StatisticsController;
import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.shared.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatisticsControllerImpl implements StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsControllerImpl(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET, value = "/positions/employees")
    public Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(Authentication authentication) {
        return statisticsService.countEmployeesByAuth(authentication);
    }
}
