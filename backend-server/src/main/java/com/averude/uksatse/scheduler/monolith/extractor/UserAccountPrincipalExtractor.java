package com.averude.uksatse.scheduler.monolith.extractor;

import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.EnterpriseAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.GlobalAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserAccountPrincipalExtractor implements PrincipalExtractor {

    private final ObjectMapper mapper;

    @Override
    public Object extractPrincipal(Map<String, Object> map) {
        Object result = null;
        if (map.containsKey("principal")) {
            var principal = (LinkedHashMap) map.get("principal");
            Object userAccount = principal.get("userAccount");
            log.trace("Account: " + userAccount);
            Collection<LinkedHashMap<String, String>> authorities = (Collection<LinkedHashMap<String, String>>) map.get("authorities");
            String authority = authorities.iterator().next().get("authority");
            switch (authority) {
                case GLOBAL_ADMIN :
                    result = mapper.convertValue(userAccount, GlobalAdminUserAccount.class);
                    break;
                case ENTERPRISE_ADMIN :
                    result = mapper.convertValue(userAccount, EnterpriseAdminUserAccount.class);
                    break;
                case DEPARTMENT_ADMIN :
                    result = mapper.convertValue(userAccount, DepartmentAdminUserAccount.class);
                    break;
                case SHIFT_ADMIN:
                    result = mapper.convertValue(userAccount, ShiftAdminUserAccount.class);
                    break;
                default: throw new RuntimeException();
            }
        } else {
            result = map.get("username");
        }
        return result;
    }
}
