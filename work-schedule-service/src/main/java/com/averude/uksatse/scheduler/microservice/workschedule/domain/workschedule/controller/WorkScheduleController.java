package com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.service.ScheduleService;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/work_schedule")
@RequiredArgsConstructor
public class WorkScheduleController {

    private final ScheduleService scheduleService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<EmployeeScheduleDTO> getAllByDepartmentId(@PathVariable Long departmentId,
                                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                          @RequestParam(value = "from")
                                                                  LocalDate from,
                                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                          @RequestParam(value = "to")
                                                                  LocalDate to) {
        return scheduleService.findAllDTOByDepartmentIdAndDate(departmentId, from, to);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasShiftsPermission(authentication, 'MAP5', #shiftIds)")
    @GetMapping("/shifts/{shiftIds}")
    public List<EmployeeScheduleDTO> getAllByShiftIds(@PathVariable List<Long> shiftIds,
                                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                      @RequestParam(value = "from")
                                                              LocalDate from,
                                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                      @RequestParam(value = "to")
                                                              LocalDate to) {
        return scheduleService.findScheduleDTOByShiftIdsAndDate(shiftIds, from, to);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP4', #schedule) and " +
                  "@hasDateLimiter.check(authentication, #schedule) and " +
                  "@employeeShiftChecker.belongs(authentication, #schedule)")
    @PostMapping
    public List<WorkDay> post(@RequestBody List<WorkDay> schedule) {
        return scheduleService.saveAll(schedule);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP4', #schedule) and " +
                  "@hasDateLimiter.check(authentication, #schedule) and " +
                  "@employeeShiftChecker.belongs(authentication, #schedule)")
    @PutMapping
    public ResponseEntity<?> put(@RequestBody List<WorkDay> schedule) {
        scheduleService.saveAll(schedule);
        return ResponseEntity.ok("WorkDays was successfully updated");
    }
}
