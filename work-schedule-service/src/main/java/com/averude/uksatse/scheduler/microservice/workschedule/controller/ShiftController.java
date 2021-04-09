package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.ShiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/shifts")
@RestController
@RequiredArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<Shift> findAllByDepartmentId(@PathVariable Long departmentId) {
        return shiftService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasShiftsPermission(authentication, 'MAP5', #shiftIds)")
    @GetMapping("{shiftIds}")
    public List<Shift> findAllByIds(@PathVariable List<Long> shiftIds) {
        return shiftService.findAllByShiftIds(shiftIds);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #shift)")
    @PostMapping
    public Shift post(@RequestBody Shift shift) {
        return shiftService.save(shift);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #shift)")
    @PutMapping
    public Shift put(@RequestBody Shift shift) {
        return shiftService.save(shift);
    }

    @Logged
    @IsDepartmentAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        shiftService.findById(id).ifPresent(shiftService::delete);
    }
}
