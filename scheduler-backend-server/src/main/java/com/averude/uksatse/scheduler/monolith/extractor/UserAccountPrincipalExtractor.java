package com.averude.uksatse.scheduler.monolith.extractor;

import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.EnterpriseAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.GlobalAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;

@Slf4j
@Component
public class UserAccountPrincipalExtractor implements PrincipalExtractor {

    private final ObjectMapper mapper;

    @Autowired
    public UserAccountPrincipalExtractor(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public Object extractPrincipal(Map<String, Object> map) {
        if (map.containsKey("principal")) {
            var principal = (LinkedHashMap) map.get("principal");
            Object userAccount = principal.get("userAccount");
            log.info("Account: " + userAccount);
            Collection<LinkedHashMap<String, String>> authorities = (Collection<LinkedHashMap<String, String>>) map.get("authorities");
            String authority = authorities.iterator().next().get("authority");
            switch (authority) {
                case GLOBAL_ADMIN : return mapper.convertValue(userAccount, GlobalAdminUserAccount. class);
                case ENTERPRISE_ADMIN : return mapper.convertValue(userAccount, EnterpriseAdminUserAccount. class);
                case DEPARTMENT_ADMIN : return mapper.convertValue(userAccount, DepartmentAdminUserAccount. class);
                case SHIFT_ADMIN: return mapper.convertValue(userAccount, ShiftAdminUserAccount. class);
                default: throw new RuntimeException();
            }
        } else {
            return map.get("username");
        }
    }
}
