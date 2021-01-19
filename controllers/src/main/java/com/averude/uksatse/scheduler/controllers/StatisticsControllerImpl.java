package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.interfaces.StatisticsController;
import com.averude.uksatse.scheduler.core.model.dto.CountDTO;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.util.UserAccountExtractor;
import com.averude.uksatse.scheduler.shared.service.StatisticsService;
import com.averude.uksatse.scheduler.statistics.service.EmployeeWorkStatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsControllerImpl implements StatisticsController {

    private final StatisticsService     statisticsService;
    private final EmployeeWorkStatService employeeWorkStatService;
    private final UserAccountExtractor  accountExtractor;

    @Override
    public Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(Authentication authentication) {
        var departmentId = accountExtractor.<DepartmentAdminUserAccount>extract(authentication).getDepartmentId();
        if (departmentId == null) throw new RuntimeException();

        log.debug("User:{} - Getting number of employees in positions.", authentication.getPrincipal());
        return statisticsService.countEmployeesByDepartmentId(departmentId);
    }

    @Override
    public List<EmployeeWorkStatDTO> getSummationDTOByAuthAndDate(Authentication authentication,
                                                                  String mode,
                                                                  LocalDate from,
                                                                  LocalDate to) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof DepartmentAdminUserAccount) {
            var departmentId = ((DepartmentAdminUserAccount) principal).getDepartmentId();
            return employeeWorkStatService.findAllByDepartmentIdAndDateBetween(departmentId, from, to, mode);
        } else if (principal instanceof ShiftAdminUserAccount) {
            var shiftId = ((ShiftAdminUserAccount) principal).getShiftId();
            return employeeWorkStatService.findAllByShiftIdAndDateBetween(shiftId, from, to, mode);
        } else {
            throw new RuntimeException();
        }
    }
}
