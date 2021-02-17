package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.interfaces.StatisticsController;
import com.averude.uksatse.scheduler.controllers.logging.Logged;
import com.averude.uksatse.scheduler.core.model.dto.CountDTO;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import com.averude.uksatse.scheduler.shared.service.StatisticsService;
import com.averude.uksatse.scheduler.statistics.service.EmployeeWorkStatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsControllerImpl implements StatisticsController {

    private final StatisticsService     statisticsService;
    private final EmployeeWorkStatService employeeWorkStatService;

    @Override
    public Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(Authentication authentication) {
        var departmentId = ((UserAccount) authentication.getPrincipal()).getDepartmentId();
        if (departmentId == null) throw new RuntimeException();

        log.debug("User:{} - Getting number of employees in positions.", authentication.getPrincipal());
        return statisticsService.countEmployeesByDepartmentId(departmentId);
    }

    @Override
    public List<EmployeeWorkStatDTO> getSummationDTOByAuthAndDate(Authentication authentication,
                                                                  String mode,
                                                                  LocalDate from,
                                                                  LocalDate to) {
        var account = (UserAccount) authentication.getPrincipal();
        if (account.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)) {
            var departmentId = account.getDepartmentId();
            return employeeWorkStatService.findAllByDepartmentIdAndDateBetween(departmentId, from, to, mode);
        } else if (account.getAuthority().equals(Authorities.SHIFT_ADMIN)) {
            var shiftIds = account.getAccountShifts().stream()
                    .map(UserAccountShift::getShiftId)
                    .collect(toList());
            return employeeWorkStatService.findAllByShiftIdsAndDateBetween(shiftIds, from, to, mode);
        } else {
            throw new RuntimeException();
        }
    }

    @Logged
    @Override
    public List<EmployeeWorkStatDTO> getSummationDTOByDepartmentId(String mode, Long departmentId, LocalDate from, LocalDate to) {
        return employeeWorkStatService.findAllByDepartmentIdAndDateBetween(departmentId, from, to, mode);
    }

    @Logged
    @Override
    public List<EmployeeWorkStatDTO> getSummationDTOByShiftIds(String mode, List<Long> shiftIds, LocalDate from, LocalDate to) {
        return employeeWorkStatService.findAllByShiftIdsAndDateBetween(shiftIds, from, to, mode);
    }
}
