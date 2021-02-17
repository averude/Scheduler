package com.averude.uksatse.scheduler.server.auth.utils;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.core.Authentication;

import java.util.Objects;

public class AccountUtils {

    public static void convertUsernameToLowercase(UserAccountDTO accountDTO) {
        Objects.requireNonNull(accountDTO);
        Objects.requireNonNull(accountDTO.getUsername());

        accountDTO.setUsername(accountDTO.getUsername().toLowerCase());
    }

    public static void convertUsernameToLowercase(NewUserAccountDTO accountDTO) {
        Objects.requireNonNull(accountDTO);
        Objects.requireNonNull(accountDTO.getUsername());

        accountDTO.setUsername(accountDTO.getUsername().toLowerCase());
    }

    public static UserAccount getUserAccount(Authentication authentication) {
        return ((UserAccountDetails) authentication.getPrincipal()).getUserAccount();
    }
}
