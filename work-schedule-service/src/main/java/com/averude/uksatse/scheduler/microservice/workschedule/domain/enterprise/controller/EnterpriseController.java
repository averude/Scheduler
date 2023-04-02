package com.averude.uksatse.scheduler.microservice.workschedule.domain.enterprise.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.enterprise.entity.Enterprise;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.enterprise.service.EnterpriseService;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongClaim;

@RequestMapping("/enterprises")
@RestController
@RequiredArgsConstructor
public class EnterpriseController {

    private final EnterpriseService enterpriseService;

    @Logged
    @IsGlobalAdmin
    @GetMapping
    public List<Enterprise> getAll() {
        return enterpriseService.findAll();
    }

    @Logged
    @GetMapping("/current")
    public Optional<Enterprise> getCurrent() {
        var enterpriseId = getCurrentUserEnterpriseId();
        return enterpriseService.findById(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP2', #id)")
    @GetMapping("{id}")
    public Optional<Enterprise> getById(@PathVariable Long id) {
        return enterpriseService.findById(id);
    }

    @Logged
    @IsGlobalAdmin
    @PostMapping
    public Enterprise post(@RequestBody @Valid Enterprise enterprise) {
        return enterpriseService.save(enterprise);
    }

    @Logged
    @IsGlobalAdmin
    @PutMapping
    public Enterprise put(@RequestBody @Valid Enterprise enterprise) {
        return enterpriseService.save(enterprise);
    }

    @Logged
    @IsGlobalAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        enterpriseService.deleteById(id);
    }

    private Long getCurrentUserEnterpriseId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt) authentication.getPrincipal();
        return getLongClaim(jwt, "enterpriseId");
    }
}
