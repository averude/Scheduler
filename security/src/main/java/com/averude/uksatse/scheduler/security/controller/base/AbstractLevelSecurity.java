package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.List;

public abstract class AbstractLevelSecurity {

    private final HashMap<String, HashMap<String, List<String>>> accessMap;

    public AbstractLevelSecurity(HashMap<String, HashMap<String, List<String>>> accessMap) {
        this.accessMap = accessMap;
    }

    protected boolean isInvalid(Authentication authentication, String mapName, Long id) {
        return id == null || id <= 0
                || authentication == null || authentication.getPrincipal() == null
                || mapName == null || mapName.isBlank();
    }

    public final boolean checkAccess(UserAccount user, String mapName) {

        var authorityMap = accessMap.get(mapName);
        if (authorityMap == null) {
            throw new RuntimeException("No authority map with name [" + mapName + "] found");
        }

        var grantedRoles = authorityMap.get(user.getAuthority());
        if (grantedRoles == null || grantedRoles.isEmpty()) {
            return false;
        }

        return grantedRoles
                .stream()
                .anyMatch(role -> role.equals(user.getRole()));
    }
}
