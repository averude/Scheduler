package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.service.EmployeeWorkStatService;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/enterprises/{enterpriseId}/departments/{departmentId}")
@RestController
@RequiredArgsConstructor
public class StatisticsController {

    private final EmployeeWorkStatService employeeWorkStatService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("/statistics/work_stats/mode/{mode}")
    public List<EmployeeWorkStatDTO> getSummationDTOByDepartmentId(@PathVariable Long enterpriseId,
                                                                   @PathVariable Long departmentId,
                                                                   @PathVariable String mode,
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                   @RequestParam(value = "from")
                                                                               LocalDate from,
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                   @RequestParam(value = "to")
                                                                               LocalDate to) {
        return employeeWorkStatService.findAllByDepartmentIdAndDateBetween(enterpriseId, departmentId, from, to, mode);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasShiftsPermission(authentication, 'MAP5', #shiftIds)")
    @GetMapping("/shifts/{shiftIds}/statistics/work_stats/mode/{mode}")
    public List<EmployeeWorkStatDTO> getSummationDTOByShiftIds(@PathVariable Long enterpriseId,
                                                               @PathVariable List<Long> shiftIds,
                                                               @PathVariable String mode,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                               @RequestParam(value = "from")
                                                                           LocalDate from,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                               @RequestParam(value = "to")
                                                                           LocalDate to) {
        return employeeWorkStatService.findAllByShiftIdsAndDateBetween(enterpriseId, shiftIds, from, to, mode);
    }
}
