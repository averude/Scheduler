package com.averude.uksatse.scheduler.security.modifier.entity;

import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.Authentication;

public interface EntityModifier<T> {
    void modify(T t, Authentication authentication);

    default UserAccount convertToUserAccount(Authentication authentication) {
        return (UserAccount) authentication.getPrincipal();
    }
}
