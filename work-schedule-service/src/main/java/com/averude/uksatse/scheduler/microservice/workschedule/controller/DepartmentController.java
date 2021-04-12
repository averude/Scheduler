package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/departments")
@RestController
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP7', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<Department> getAllByEnterpriseId(@PathVariable Long enterpriseId) {
        return departmentService.findAllByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP*', #id)")
    @GetMapping("{id}")
    public Optional<Department> getById(@PathVariable Long id) {
        return departmentService.findById(id);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #department)")
    @PostMapping
    public Department post(@RequestBody Department department) {
        return departmentService.save(department);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #department)")
    @PutMapping
    public Department put(@RequestBody Department department) {
        return departmentService.save(department);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        departmentService.deleteById(id);
    }
}
