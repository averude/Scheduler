package com.averude.uksatse.scheduler.core.security.converter;

import com.averude.uksatse.scheduler.core.entity.User;
import com.averude.uksatse.scheduler.core.security.principal.SchedulerUserPrincipal;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import java.util.HashMap;
import java.util.Map;

public class ExtraInfoJwtAccessTokenConverter extends JwtAccessTokenConverter {

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken,
                                     OAuth2Authentication authentication) {
        if (authentication.getOAuth2Request().getGrantType().equalsIgnoreCase("password")) {
            ((DefaultOAuth2AccessToken) accessToken)
                    .setAdditionalInformation(getAdditionalInfo(authentication));
        }
        accessToken = super.enhance(accessToken, authentication);
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(new HashMap<>());
        return accessToken;
    }

    @Override
    public OAuth2Authentication extractAuthentication(Map<String, ?> claims) {
        OAuth2Authentication authentication = super.extractAuthentication(claims);
        authentication.setDetails(claims);
        return authentication;
    }

    private Map<String, Object> getAdditionalInfo(OAuth2Authentication authentication) {
        User user = ((SchedulerUserPrincipal) authentication.getPrincipal()).getUser();

        Map<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("department_id", user.getDepartmentId());
        additionalInfo.put("shift_id", user.getShiftId());
        additionalInfo.put("employee_id", user.getEmployeeId());
        return additionalInfo;
    }
}
