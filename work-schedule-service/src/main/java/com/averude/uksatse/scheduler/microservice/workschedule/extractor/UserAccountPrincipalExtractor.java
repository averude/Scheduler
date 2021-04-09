package com.averude.uksatse.scheduler.microservice.workschedule.extractor;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

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
            var userAccount = principal.get("userAccount");
            var account = mapper.convertValue(userAccount, UserAccount.class);
            result = new UserAccountDetails(account);
        } else {
            result = map.get("username");
        }
        return result;
    }
}
