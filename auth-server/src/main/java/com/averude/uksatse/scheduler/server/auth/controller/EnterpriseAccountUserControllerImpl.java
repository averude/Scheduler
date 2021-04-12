package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.server.auth.service.EnterpriseUserAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Slf4j
@RestController
@RequestMapping("/users/enterprise_admins")
@RequiredArgsConstructor
public class EnterpriseAccountUserControllerImpl {

    private final EnterpriseUserAccountService enterpriseUserAccountService;

    @IsGlobalAdmin
    @GetMapping
    public List<UserAccountDTO> getAllByAuth(Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Getting list of enterprise user accounts.", originator);
        return enterpriseUserAccountService.findAllEnterpriseUserAccounts();
    }

    @IsGlobalAdmin
    @PostMapping
    public UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                                 Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Creating enterprise user account with username {} and role {}.",
                originator, accountDTO.getUsername(), accountDTO.getRole());
        return enterpriseUserAccountService.create(accountDTO, originator);
    }

    @IsGlobalAdmin
    @PutMapping
    public UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                                 Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Updating enterprise user account {}.", originator, accountDTO);
        return enterpriseUserAccountService.update(accountDTO);
    }

    @IsGlobalAdmin
    @DeleteMapping(path = "/{accountId}")
    public void delete(@PathVariable Long accountId,
                       Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Deleting enterprise user account with id:{}.", originator, accountId);
        enterpriseUserAccountService.delete(accountId, originator);
    }

    @IsGlobalAdmin
    @PutMapping("/{accountId}/password")
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO,
                              Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.info("User:{} - Password reset for enterprise user account with id: {}", originator, accountId);
        enterpriseUserAccountService.resetPassword(accountId, passwordResetDTO, originator);
    }
}
