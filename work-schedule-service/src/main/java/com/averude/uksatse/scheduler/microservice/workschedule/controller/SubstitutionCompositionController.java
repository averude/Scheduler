package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.SubstitutionCompositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/substitution_compositions")
@RestController
@RequiredArgsConstructor
public class SubstitutionCompositionController {

    private final SubstitutionCompositionService substitutionCompositionService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #composition)")
    @PostMapping
    public SubstitutionComposition post(@Valid @RequestBody SubstitutionComposition composition) {
        return substitutionCompositionService.save(composition);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #composition)")
    @PutMapping
    public SubstitutionComposition put(@RequestBody SubstitutionComposition composition) {
        return substitutionCompositionService.save(composition);
    }

    @Logged
    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        substitutionCompositionService.deleteById(id);
    }
}
