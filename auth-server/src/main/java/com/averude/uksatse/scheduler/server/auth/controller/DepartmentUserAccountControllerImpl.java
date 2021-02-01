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
public class DepartmentUserAccountControllerImpl implements DepartmentUserAccountController {

    private final UserAccountDetailsService userAccountDetailsService;

    @Override
    public List<UserAccountDTO> getAllByAuth(Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Getting list of department user accounts.", originator);
        return userAccountDetailsService.findAllByEnterpriseId(originator.getEnterpriseId());
    }

    @Override
    public UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                                 Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Creating department user account with username {} and role {}.",
                originator, accountDTO.getUsername(), accountDTO.getRole());
        return userAccountDetailsService.createDepartmentUser(accountDTO, originator);
    }

    @Override
    public UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                                 Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Updating department user account {}.", originator, accountDTO);
        return userAccountDetailsService.updateDepartmentUser(accountDTO, originator);
    }

    @Override
    public void delete(@PathVariable Long accountId, Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.debug("User:{} - Deleting department user account with id:{}.", originator, accountId);
        userAccountDetailsService.deleteDepartmentUser(accountId, originator);
    }

    @Override
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO,
                              Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.info("User:{} - Password reset for department user account with id: {}", originator, accountId);
        userAccountDetailsService.resetDepartmentUserPassword(accountId, passwordResetDTO, originator);
    }

    private UserAccount getUserAccount(Authentication authentication) {
        return ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
    }
}
