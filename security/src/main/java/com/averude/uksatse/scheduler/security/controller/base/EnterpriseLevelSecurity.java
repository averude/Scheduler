package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;
import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Slf4j
@Component
@RequiredArgsConstructor
public class EnterpriseLevelSecurity {

    private final AccessMapSecurityChecker accessMapSecurityChecker;

    public boolean hasPermission(Authentication authentication, String mapName, Long enterpriseId) {
        if (accessMapSecurityChecker.isInvalid(authentication, mapName, enterpriseId)) {
            return false;
        }

        var account = getUserAccount(authentication);

        return accessMapSecurityChecker.checkAccess(account, mapName) && checkEnterpriseId(account, enterpriseId);
    }

    public boolean hasPermission(Authentication authentication, String mapName, HasEnterpriseId hasEnterpriseId) {
        if (hasEnterpriseId == null) {
            return false;
        }

        return hasPermission(authentication, mapName, hasEnterpriseId.getEnterpriseId());
    }

    private boolean checkEnterpriseId(UserAccount account, Long enterpriseId) {
        if (account.getAuthority().equals(ENTERPRISE_ADMIN)
                || account.getAuthority().equals(DEPARTMENT_ADMIN)
                || account.getAuthority().equals(SHIFT_ADMIN)) {
            return account.getEnterpriseId().equals(enterpriseId);
        }

        log.error("No required authority found during check");
        return false;
    }
}
