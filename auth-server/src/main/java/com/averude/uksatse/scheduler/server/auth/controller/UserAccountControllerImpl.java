package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.converter.UserAccountDTOConverter;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserAccountControllerImpl implements UserAccountController {

    private final UserAccountDetailsService userAccountDetailsService;
    private final UserAccountDTOConverter dtoConverter;

    @Override
    public Principal getUser(Principal principal) {
        return principal;
    }

    @Override
    public UserAccountDTO me(Authentication authentication) {
        var originator = getUserAccount(authentication);
        return dtoConverter.convertToDTO(originator);
    }

    @Override
    public String getUserFullName(Authentication authentication) {
        return getUserAccount(authentication).getName();
    }

    @Override
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDTO,
                               Authentication authentication) {
        var originator = getUserAccount(authentication);
        log.info("User:{} - Password change request", originator);
        userAccountDetailsService.changePassword(passwordChangeDTO, originator);
    }

    private UserAccount getUserAccount(Authentication authentication) {
        return ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
    }
}
