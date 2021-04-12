package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.validation.Valid;

public interface UserAccountDetailsService extends UserDetailsService {
    void changePassword(@Valid PasswordChangeDTO passwordChangeDTO, UserAccount originator);
}
