package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.server.auth.service.DepartmentUserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users/department_admins")
@RestController
@RequiredArgsConstructor
public class DepartmentUserAccountController {

    private final DepartmentUserAccountService userAccountDetailsService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<UserAccountDTO> getAllByEnterpriseId(@PathVariable Long enterpriseId) {
        return userAccountDetailsService.findAllByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #accountDTO.enterpriseId)")
    @PostMapping
    public UserAccountDTO post(@RequestBody NewUserAccountDTO accountDTO) {
        return userAccountDetailsService.create(accountDTO);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #accountDTO.enterpriseId)")
    @PutMapping
    public UserAccountDTO put(@RequestBody UserAccountDTO accountDTO) {
        return userAccountDetailsService.update(accountDTO);
    }

    @Logged
    @PreAuthorize("@userAccountControllerSecurity.hasAccountPermission(authentication, 'MAP6', #accountId)")
    @DeleteMapping(path = "/{accountId}")
    public void delete(@PathVariable Long accountId) {
        userAccountDetailsService.delete(accountId);
    }

    @Logged
    @PreAuthorize("@userAccountControllerSecurity.hasAccountPermission(authentication, 'MAP6', #accountId)")
    @PutMapping("/{accountId}/password")
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO) {
        userAccountDetailsService.resetPassword(accountId, passwordResetDTO);
    }
}
