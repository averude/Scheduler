package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class EnterpriseAccountUserControllerImpl implements EnterpriseAccountUserController {

    private final UserAccountDetailsService userAccountDetailsService;

    @Override
    public List<UserAccountDTO> getAllByAuth(Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Getting list of enterprise user accounts.", originator);
        return userAccountDetailsService.findAllEnterpriseUserAccounts();
    }

    @Override
    public UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                                 Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Creating enterprise user account with username {} and role {}.",
                originator, accountDTO.getUsername(), accountDTO.getRole());
        return userAccountDetailsService.createEnterpriseUser(accountDTO, originator);
    }

    @Override
    public UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                                 Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Updating enterprise user account {}.", originator, accountDTO);
        return userAccountDetailsService.updateUser(accountDTO);
    }

    @Override
    public void delete(@PathVariable Long accountId,
                       Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Deleting enterprise user account with id:{}.", originator, accountId);
        userAccountDetailsService.deleteEnterpriseUser(accountId, originator);
    }

    @Override
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO,
                              Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.info("User:{} - Password reset for enterprise user account with id: {}", originator, accountId);
        userAccountDetailsService.resetEnterpriseUserPassword(accountId, passwordResetDTO, originator);
    }

    private UserAccount getUserAccount(Authentication authentication) {
        return ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
    }
}
