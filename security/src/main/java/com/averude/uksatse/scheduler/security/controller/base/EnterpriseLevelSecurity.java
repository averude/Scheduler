package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.text.ParseException;

import static com.averude.uksatse.scheduler.security.details.UserLevels.*;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongClaim;

@Slf4j
@Component
@RequiredArgsConstructor
public class EnterpriseLevelSecurity {

    private final AccessMapSecurityChecker accessMapSecurityChecker;

    public boolean hasPermission(Authentication authentication, String mapName, Long enterpriseId) {
        if (accessMapSecurityChecker.isInvalid(authentication, mapName, enterpriseId)) {
            return false;
        }

        Jwt jwtToken = (Jwt) authentication.getPrincipal();

        return accessMapSecurityChecker.checkAccess(jwtToken, mapName) && checkEnterpriseId(jwtToken, enterpriseId);
    }

    public boolean hasPermission(Authentication authentication, String mapName, HasEnterpriseId hasEnterpriseId) throws ParseException {
        if (hasEnterpriseId == null) {
            return false;
        }

        return hasPermission(authentication, mapName, hasEnterpriseId.getEnterpriseId());
    }

    private boolean checkEnterpriseId(Jwt jwt, Long enterpriseId) {
        var level = jwt.getClaimAsString("level");

        if (level.equals(ENTERPRISE) ||
                level.equals(DEPARTMENT) ||
                level.equals(SHIFT)) {
            return getLongClaim(jwt, "enterpriseId").equals(enterpriseId);
        }

        log.error("No required level found during check");
        return false;
    }
}
