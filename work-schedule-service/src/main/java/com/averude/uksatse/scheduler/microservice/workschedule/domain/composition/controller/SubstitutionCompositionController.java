package com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.service.SubstitutionCompositionService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
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
    public SubstitutionComposition post(@RequestBody @Valid SubstitutionComposition composition) {
        return substitutionCompositionService.save(composition);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #composition)")
    @PutMapping
    public SubstitutionComposition put(@RequestBody @Valid SubstitutionComposition composition) {
        return substitutionCompositionService.save(composition);
    }

    @Logged
    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        substitutionCompositionService.deleteById(id);
    }
}
