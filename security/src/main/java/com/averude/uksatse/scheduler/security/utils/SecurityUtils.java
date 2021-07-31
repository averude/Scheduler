package com.averude.uksatse.scheduler.security.utils;

import com.averude.uksatse.scheduler.security.model.entity.UserAccountDepartment;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import net.minidev.json.JSONArray;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;

import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class SecurityUtils {
    private SecurityUtils(){}

    public static List<Long> getLongListClaim(Jwt jwt, String name) {
        return ((JSONArray) jwt.getClaim(name)).stream()
                .map(obj -> (Long) obj)
                .collect(toList());
    }

    public static Long getLongClaim(Jwt jwt, String name) {
        String stringClaim = jwt.getClaimAsString(name);
        if (stringClaim == null || stringClaim.isEmpty()) {
            throw new JwtException("Claim with name \"" + name + "\" not found");
        }

        return Long.valueOf(stringClaim);
    }

    public static List<Long> getDepartmentIds(Collection<UserAccountDepartment> accountDepartments) {
        return accountDepartments
                .stream()
                .map(UserAccountDepartment::getDepartmentId)
                .collect(toList());
    }

    public static List<Long> getShiftIds(Collection<UserAccountShift> accountShifts) {
        return accountShifts
                .stream()
                .map(UserAccountShift::getShiftId)
                .collect(toList());
    }
}

