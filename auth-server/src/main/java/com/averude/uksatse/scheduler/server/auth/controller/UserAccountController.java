package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

public interface UserAccountController {
    @GetMapping(path = "/current")
    Principal getUser(Principal principal);

    @GetMapping(path = "/current/full_name")
    String getUserFullName(Authentication authentication);

    @PostMapping(path = "/current/password")
    void changePassword(@RequestBody PasswordChangeDTO passwordChangeDTO,
                        Authentication authentication);
}
