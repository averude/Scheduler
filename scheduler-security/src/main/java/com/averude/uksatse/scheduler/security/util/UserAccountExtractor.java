package com.averude.uksatse.scheduler.security.util;

import com.averude.uksatse.scheduler.security.entity.UserAccount;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserAccountExtractor {

    public <T extends UserAccount> T extract(Authentication authentication) {
        try {
            return (T) authentication.getPrincipal();
        } catch (ClassCastException e) {
            log.error(e.getLocalizedMessage());
            throw e;
        }
    }
}
