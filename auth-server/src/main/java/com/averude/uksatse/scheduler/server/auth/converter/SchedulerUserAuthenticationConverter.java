package com.averude.uksatse.scheduler.server.auth.converter;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.utils.SecurityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.token.DefaultUserAuthenticationConverter;

import java.util.Map;

public class SchedulerUserAuthenticationConverter extends DefaultUserAuthenticationConverter {

    @Override
    public Map<String, ?> convertUserAuthentication(Authentication authentication) {
        Map<String, Object> map = (Map<String, Object>) super.convertUserAuthentication(authentication);

        var userAccount = getUserAccount(authentication);

        map.put("level", userAccount.getAuthority());
        map.put("role", userAccount.getRole());
        map.put("enterpriseId", userAccount.getEnterpriseId());
        map.put("departmentIds", SecurityUtils.getDepartmentIds(userAccount.getAccountDepartments()));
        map.put("shiftIds", SecurityUtils.getShiftIds(userAccount.getAccountShifts()));

        return map;
    }

    private static UserAccount getUserAccount(Authentication authentication) {
        var principal = authentication.getPrincipal();
        if (principal instanceof UserAccountDetails) {
            return ((UserAccountDetails) principal).getUserAccount();
        } else throw new RuntimeException();
    }
}
