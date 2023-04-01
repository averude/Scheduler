package com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.controller;

import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.service.DepartmentDayTypeService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public List<DepartmentDayType> getAllByDepartmentId(@PathVariable Long departmentId) {
        return departmentDayTypeService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PostAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #returnObject)")
    @GetMapping("{id}")
    public Optional<DepartmentDayType> getById(@PathVariable Long id) {
        return departmentDayTypeService.findById(id);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentDayType)")
    @PostMapping
    public DepartmentDayType post(@RequestBody @Valid DepartmentDayType departmentDayType) {
        return departmentDayTypeService.save(departmentDayType);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentDayType)")
    @PutMapping
    public DepartmentDayType put(@RequestBody @Valid DepartmentDayType departmentDayType) {
        return departmentDayTypeService.save(departmentDayType);
    }

    @Logged
    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        departmentDayTypeService.deleteById(id);
    }
}
