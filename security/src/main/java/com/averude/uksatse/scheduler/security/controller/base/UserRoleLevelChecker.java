package com.averude.uksatse.scheduler.security.controller.base;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRoleLevelChecker {

    public boolean hasLevel(String level) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt) authentication.getPrincipal();
        return jwt.getClaimAsString("level").equals(level);
    }

    public boolean hasRole(String role) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt) authentication.getPrincipal();
        return jwt.getClaimAsString("role").equals(role);
    }

    public boolean checkAnyLevel(String... levels) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt) authentication.getPrincipal();
        var usrLevel = jwt.getClaimAsString("level");

        for (var level : levels) {
            if (level.equals(usrLevel)) {
                return true;
            }
        }

        return false;
    }

    public boolean checkAnyRole(String... roles) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var jwt = (Jwt) authentication.getPrincipal();
        var usrLevel = jwt.getClaimAsString("role");

        for (var role : roles) {
            if (role.equals(usrLevel)) {
                return true;
            }
        }

        return false;
    }

}
