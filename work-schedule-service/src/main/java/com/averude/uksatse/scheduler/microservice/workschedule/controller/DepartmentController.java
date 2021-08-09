package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.microservice.workschedule.service.DepartmentService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    @PreAuthorize("@departmentLevelSecurity.hasDepPermission(authentication, 'MAP2', #ids)")
    @GetMapping("{ids}")
    public List<Department> getByIds(@PathVariable List<Long> ids) {
        return departmentService.findAllById(ids);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #department)")
    @PostMapping
    public Department post(@RequestBody @Valid Department department) {
        return departmentService.save(department);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #department)")
    @PutMapping
    public Department put(@RequestBody @Valid Department department) {
        return departmentService.save(department);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        departmentService.deleteById(id);
    }
}
