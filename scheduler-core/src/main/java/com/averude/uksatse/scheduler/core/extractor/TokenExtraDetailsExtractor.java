package com.averude.uksatse.scheduler.core.extractor;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TokenExtraDetailsExtractor {

    public static final String DEPARTMENT_ID = "department_id";
    public static final String EMPLOYEE_ID = "employee_id";

    public Map<String, Object> extract(Authentication authentication) {
        OAuth2AuthenticationDetails oauthDetails
                = (OAuth2AuthenticationDetails) authentication.getDetails();
        return (Map<String, Object>) oauthDetails.getDecodedDetails();
    }
}
