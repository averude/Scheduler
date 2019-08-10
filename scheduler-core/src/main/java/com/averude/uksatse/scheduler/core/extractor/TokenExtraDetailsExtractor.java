package com.averude.uksatse.scheduler.core.extractor;

import com.averude.uksatse.scheduler.core.exception.DecodedDetailsMissingFieldException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TokenExtraDetailsExtractor {

    public static final String GLOBAL_ADMIN     = "GLOBAL_ADMIN";
    public static final String DEPARTMENT_ADMIN = "DEPARTMENT_ADMIN";
    public static final String SHIFT_ADMIN      = "SHIFT_ADMIN";
    public static final String CLIENT           = "CLIENT";

    public static final String DEPARTMENT_ID    = "department_id";
    public static final String SHIFT_ID         = "shift_id";
    public static final String EMPLOYEE_ID      = "employee_id";

    public Long extractId(Authentication authentication, String key) {
        Integer keyValue = extractDecodedDetails(authentication).get(key);
        if (keyValue == null) {
            throw new DecodedDetailsMissingFieldException("Empty key's value");
        }
        return keyValue.longValue();
    }

    public Long extractId(Authentication authentication) {
        Map<String, Integer> decodedDetails = extractDecodedDetails(authentication);

        List<String> authoritiesList = getAuthoritiesList(authentication);

        if (authoritiesList.contains(DEPARTMENT_ADMIN)) {
            return decodedDetails.get(DEPARTMENT_ID).longValue();
        } else if (authoritiesList.contains(SHIFT_ADMIN)) {
            return decodedDetails.get(SHIFT_ID).longValue();
        } else {
            return decodedDetails.get(EMPLOYEE_ID).longValue();
        }
    }

    public Map<String, Integer> extractDecodedDetails(Authentication authentication) {
        OAuth2AuthenticationDetails oauthDetails
                = (OAuth2AuthenticationDetails) authentication.getDetails();
        return (Map<String, Integer>) oauthDetails.getDecodedDetails();
    }

    public List<String> getAuthoritiesList(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities
                = authentication.getAuthorities();

        return authorities.stream()
                .map(value -> ((GrantedAuthority) value).getAuthority())
                .collect(Collectors.toList());
    }
}
