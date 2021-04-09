package com.averude.uksatse.scheduler.security.details;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.core.Authentication;

public class AccountUtils {

    public static UserAccount getUserAccount(Authentication authentication) {
        var principal = authentication.getPrincipal();
        if (principal instanceof UserAccountDetails) {
            return ((UserAccountDetails) principal).getUserAccount();
        } else throw new RuntimeException();
    }
}
