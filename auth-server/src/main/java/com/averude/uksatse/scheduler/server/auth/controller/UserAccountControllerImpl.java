package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserAccountControllerImpl {

    private final UserAccountDetailsService userAccountDetailsService;

    @Logged
    @GetMapping("/me")
    public UserAccountDTO me() {
        var username = getUsername();
        var details = (UserAccountDetails) userAccountDetailsService.loadUserByUsername(username);
        return new UserAccountDTO(details.getUserAccount());
    }

    @Logged
    @PostMapping(path = "/current/password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDTO) {
        var username = getUsername();
        userAccountDetailsService.changePassword(passwordChangeDTO, username);
    }

    private String getUsername() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException(); // TODO: create exception
        }

        var jwt = (Jwt) authentication.getPrincipal();
        var username = jwt.getClaimAsString("user_name");
        if (username == null || username.isBlank()) {
            throw new RuntimeException(); // TODO: create exception
        }

        return username;
    }
}
