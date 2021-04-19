package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.shared.service.EnterpriseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

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
    @IsAnyUser
    @GetMapping("/current")
    public Optional<Enterprise> getCurrent() {
        var userAccount = getUser();

        var enterpriseId = userAccount.getEnterpriseId();
        if (enterpriseId == null) throw new RuntimeException();

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
    public Enterprise post(@RequestBody Enterprise enterprise) {
        return enterpriseService.save(enterprise);
    }

    @Logged
    @IsGlobalAdmin
    @PutMapping
    public Enterprise put(@RequestBody Enterprise enterprise) {
        return enterpriseService.save(enterprise);
    }

    @Logged
    @IsGlobalAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        enterpriseService.deleteById(id);
    }

    private UserAccount getUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return getUserAccount(authentication);
    }
}
