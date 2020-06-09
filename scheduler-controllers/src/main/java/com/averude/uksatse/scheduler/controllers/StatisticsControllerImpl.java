package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.interfaces.StatisticsController;
import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.core.dto.SummationDTO;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.security.util.UserAccountExtractor;
import com.averude.uksatse.scheduler.shared.service.StatisticsService;
import com.averude.uksatse.scheduler.statistics.service.SummationDTOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatisticsControllerImpl implements StatisticsController {

    private final StatisticsService     statisticsService;
    private final SummationDTOService   summationDTOService;
    private final UserAccountExtractor  accountExtractor;
    private final SimpleByAuthMethodResolver methodResolver;

    @Autowired
    public StatisticsControllerImpl(StatisticsService statisticsService,
                                    SummationDTOService summationDTOService,
                                    UserAccountExtractor accountExtractor,
                                    SimpleByAuthMethodResolver methodResolver) {
        this.statisticsService = statisticsService;
        this.summationDTOService = summationDTOService;
        this.accountExtractor = accountExtractor;
        this.methodResolver = methodResolver;
    }

    @Override
    public Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(Authentication authentication) {
        var departmentId = accountExtractor.<DepartmentAdminUserAccount>extract(authentication).getDepartmentId();
        if (departmentId == null) throw new RuntimeException();

        return statisticsService.countEmployeesByDepartmentId(departmentId);
    }

    @Override
    public List<SummationDTO> getSummationDtoByDepartmentIdAndDate(Authentication authentication,
                                                                   LocalDate from,
                                                                   LocalDate to) {
        return methodResolver.findAll(authentication, summationDTOService, from, to);
    }
}
