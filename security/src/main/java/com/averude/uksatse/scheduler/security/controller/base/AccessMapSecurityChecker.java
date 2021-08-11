package com.averude.uksatse.scheduler.security.controller.base;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AccessMapSecurityChecker {

    private final HashMap<String, HashMap<String, List<String>>> accessMap;

    public boolean isInvalid(Authentication authentication, String mapName, Long id) {
        return id == null || id <= 0
                || authentication == null || authentication.getPrincipal() == null
                || mapName == null || mapName.isBlank();
    }

    public final boolean checkAccess(Jwt jwt, String mapName) {

        var level = jwt.getClaimAsString("level");
        var role = jwt.getClaimAsString("role");

        var levelMap = accessMap.get(mapName);
        if (levelMap == null) {
            throw new RuntimeException("No level map with name [" + mapName + "] found");
        }

        var grantedRoles = levelMap.get(level);
        if (grantedRoles == null || grantedRoles.isEmpty()) {
            return false;
        }

        return grantedRoles
                .stream()
                .anyMatch(grantedRole -> grantedRole.equals(role));
    }
}
