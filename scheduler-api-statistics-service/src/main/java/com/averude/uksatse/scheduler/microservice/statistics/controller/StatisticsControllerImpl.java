package com.averude.uksatse.scheduler.microservice.statistics.controller;

import com.averude.uksatse.scheduler.core.controllers.interfaces.StatisticsController;
import com.averude.uksatse.scheduler.core.dto.CountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.averude.uksatse.scheduler.shared.service.StatisticsService;

@RestController
public class StatisticsControllerImpl implements StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsControllerImpl(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET, value = "/positions/employees")
    public Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(@RequestHeader("Department-ID") Long departmentId) {
        return statisticsService.countEmployeesByDepartmentId(departmentId);
    }
}