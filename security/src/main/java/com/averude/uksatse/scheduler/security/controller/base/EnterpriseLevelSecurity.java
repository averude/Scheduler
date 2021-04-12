package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;
import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Slf4j
@Component
public class EnterpriseLevelSecurity extends AbstractLevelSecurity {

    public EnterpriseLevelSecurity(HashMap<String, HashMap<String, List<String>>> accessMap) {
        super(accessMap);
    }

    public boolean hasPermission(Authentication authentication, String mapName, Long enterpriseId) {
        if (isInvalid(authentication, mapName, enterpriseId)) {
            return false;
        }

        var account = getUserAccount(authentication);

        return checkAccess(account, mapName) && checkEnterpriseId(account, enterpriseId);
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
