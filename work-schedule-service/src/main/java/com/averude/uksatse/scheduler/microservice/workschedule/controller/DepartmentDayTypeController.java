package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.DepartmentDayTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/department_day_types")
@RestController
@RequiredArgsConstructor
public class DepartmentDayTypeController {

    private final DepartmentDayTypeService departmentDayTypeService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<DepartmentDayType> findAllByDepartmentId(@PathVariable Long departmentId) {
        return departmentDayTypeService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PostAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #returnObject)")
    @GetMapping("{id}")
    public Optional<DepartmentDayType> findById(@PathVariable Long id) {
        return departmentDayTypeService.findById(id);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentDayType)")
    @PostMapping
    public DepartmentDayType post(@RequestBody DepartmentDayType departmentDayType) {
        return departmentDayTypeService.save(departmentDayType);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentDayType)")
    @PutMapping
    public DepartmentDayType put(@RequestBody DepartmentDayType departmentDayType) {
        return departmentDayTypeService.save(departmentDayType);
    }

    @Logged
    @IsDepartmentAdmin
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        departmentDayTypeService.deleteById(id);
    }
}
