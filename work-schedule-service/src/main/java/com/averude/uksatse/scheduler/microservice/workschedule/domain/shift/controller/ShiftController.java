package com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.controller;

import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.service.ShiftService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/shifts")
@RestController
@RequiredArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<Shift> getAllByDepartmentId(@PathVariable Long departmentId) {
        return shiftService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasShiftsPermission(authentication, 'MAP5', #shiftIds)")
    @GetMapping("{shiftIds}")
    public List<Shift> getAllByIds(@PathVariable List<Long> shiftIds) {
        return shiftService.findAllByShiftIds(shiftIds);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #shift)")
    @PostMapping
    public Shift post(@RequestBody @Valid Shift shift) {
        return shiftService.save(shift);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #shift)")
    @PutMapping
    public Shift put(@RequestBody @Valid Shift shift) {
        return shiftService.save(shift);
    }

    @Logged
    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        shiftService.findById(id).ifPresent(shiftService::delete);
    }
}
