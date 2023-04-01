package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.CalendarDataDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service.CalendarDataService;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CalendarDataController {

    private final CalendarDataService calendarDataService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("/enterprises/{enterpriseId}/departments/{departmentId}/calendar_data")
    public CalendarDataDTO getByDepartmentId(@PathVariable Long enterpriseId,
                                             @PathVariable Long departmentId,
                                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                             @RequestParam(value = "from")
                                                 LocalDate from,
                                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                             @RequestParam(value = "to")
                                                 LocalDate to) {
        return calendarDataService.getByDepartmentId(enterpriseId, departmentId, from, to);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasShiftsPermission(authentication, 'MAP5', #shiftIds)")
    @GetMapping("/enterprises/{enterpriseId}/departments/{departmentId}/shifts/{shiftIds}/calendar_data")
    public CalendarDataDTO getByShiftIds(@PathVariable Long enterpriseId,
                                         @PathVariable Long departmentId,
                                         @PathVariable List<Long> shiftIds,
                                         @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                         @RequestParam(value = "from")
                                             LocalDate from,
                                         @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                         @RequestParam(value = "to")
                                             LocalDate to) {
        return calendarDataService.getByShiftIds(enterpriseId, departmentId, shiftIds, from, to);
    }
}
