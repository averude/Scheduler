package com.averude.uksatse.scheduler.server.auth.enhancers;

import com.averude.uksatse.scheduler.server.auth.entity.SchedulerUserDetails;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

public class ExtraUserInfoTokenEnhancer implements TokenEnhancer {
    public ExtraUserInfoTokenEnhancer() {
    }

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken,
                                     OAuth2Authentication oAuth2Authentication) {
        ((DefaultOAuth2AccessToken) oAuth2AccessToken)
                .setAdditionalInformation(getAdditionalInfo(oAuth2Authentication));
        return oAuth2AccessToken;
    }

    private Map<String, Object> getAdditionalInfo(OAuth2Authentication authentication) {
        SchedulerUserDetails userDetails = (SchedulerUserDetails) authentication.getPrincipal();
        Long departmentId = userDetails.getDepartmentId();
        Long employeeId = userDetails.getEmployeeId();

        Map<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("department_id", departmentId);
        additionalInfo.put("employee_id", employeeId);
        return additionalInfo;
    }
}
