package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/employees")
@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<Employee> getAllByDepartmentId(@PathVariable Long departmentId) {
        return employeeService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PostAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #returnObject)")
    @GetMapping("/{id}")
    public Optional<Employee> getById(@PathVariable Long id) {
        return employeeService.findById(id);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #employee)")
    @PostMapping
    public Employee post(@RequestBody @Valid Employee employee) {
        return employeeService.save(employee);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #employee)")
    @PutMapping
    public Employee put(@RequestBody @Valid Employee employee) {
        return employeeService.save(employee);
    }

    @Logged
    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeService.findById(id).ifPresent(employeeService::delete);
    }
}
