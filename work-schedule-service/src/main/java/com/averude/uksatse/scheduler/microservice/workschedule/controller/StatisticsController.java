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

@RequestMapping("/statistics")
@RestController
@RequiredArgsConstructor
public class StatisticsController {

    private final EmployeeWorkStatService employeeWorkStatService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("work_stats/mode/{mode}/departments/{departmentId}")
    public List<EmployeeWorkStatDTO> getSummationDTOByDepartmentId(@PathVariable String mode,
                                                                   @PathVariable Long departmentId,
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                   @RequestParam(value = "from")
                                                                               LocalDate from,
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                   @RequestParam(value = "to")
                                                                               LocalDate to) {
        return employeeWorkStatService.findAllByDepartmentIdAndDateBetween(departmentId, from, to, mode);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasShiftsPermission(authentication, 'MAP5', #shiftIds)")
    @GetMapping("work_stats/mode/{mode}/shifts/{shiftIds}")
    public List<EmployeeWorkStatDTO> getSummationDTOByShiftIds(@PathVariable String mode,
                                                               @PathVariable List<Long> shiftIds,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                               @RequestParam(value = "from")
                                                                           LocalDate from,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                               @RequestParam(value = "to")
                                                                           LocalDate to) {
        return employeeWorkStatService.findAllByShiftIdsAndDateBetween(shiftIds, from, to, mode);
    }
}
