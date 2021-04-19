package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.WorkingNormService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("/working_norms")
@RestController
@RequiredArgsConstructor
public class WorkingNormController {

    private final WorkingNormService workingNormService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentId)")
    @GetMapping("/departments/{departmentId}/dto")
    public List<? extends BasicDto<Shift, WorkingNorm>> getAllDtoByDepartmentId(@PathVariable Long departmentId,
                                                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                                 @RequestParam(value = "from")
                                                                                         LocalDate from,
                                                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                                 @RequestParam(value = "to")
                                                                                         LocalDate to) {
        return workingNormService.findAllDtoByDepartmentIdAndDate(departmentId, from, to);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<WorkingNorm> getAllByDepartmentId(@PathVariable Long departmentId,
                                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                   @RequestParam(value = "from")
                                                           LocalDate from,
                                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                   @RequestParam(value = "to")
                                                           LocalDate to) {
        return workingNormService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Logged
    @PostAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #returnObject)")
    @GetMapping("{id}")
    public Optional<WorkingNorm> getById(@PathVariable Long id) {
        return workingNormService.findById(id);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #workingNorm)")
    @PostMapping
    public WorkingNorm post(@RequestBody WorkingNorm workingNorm) {
        return workingNormService.save(workingNorm);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #workingNorm)")
    @PutMapping
    public WorkingNorm put(@RequestBody WorkingNorm workingNorm) {
        return workingNormService.save(workingNorm);
    }
}
