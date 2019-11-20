package com.averude.uksatse.scheduler.core.extractor;

import com.averude.uksatse.scheduler.core.exception.DecodedDetailsMissingFieldException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class DataByAuthorityExtractor {
    private Logger logger = LoggerFactory.getLogger(DataByAuthorityExtractor.class);

    private static final String GLOBAL_ADMIN     = "GLOBAL_ADMIN";
    private static final String DEPARTMENT_ADMIN = "DEPARTMENT_ADMIN";
    private static final String SHIFT_ADMIN      = "SHIFT_ADMIN";
    private static final String CLIENT           = "CLIENT";
    private static final String DEPARTMENT_ID    = "department_id";
    private static final String SHIFT_ID         = "shift_id";
    private static final String EMPLOYEE_ID      = "employee_id";

    public <T extends Serializable, R> R getData(Authentication authentication,
                                                 OnAuthorityFound<T, R> onDepartmentAdminAuthority,
                                                 OnAuthorityFound<T, R> onShiftAdminAuthority) {
        return this.getData(authentication,
                null,
                onDepartmentAdminAuthority,
                onShiftAdminAuthority);
    }

    public <T extends Serializable, R> R getData(Authentication authentication,
                                                 OnAuthorityFound<T, R> onGlobalAdminAuthority,
                                                 OnAuthorityFound<T, R> onDepartmentAdminAuthority,
                                                 OnAuthorityFound<T, R> onShiftAdminAuthority) {
        Map<String, Integer> decodedDetails = extractDecodedDetails(authentication);
        List<String> authoritiesList = getAuthoritiesList(authentication);

        logger.debug("Token data:\n " +
                "List of authorities: {}\n " +
                "List of details: {}", authoritiesList.toString(), decodedDetails.toString());

        if (authoritiesList.contains(GLOBAL_ADMIN)) {
            if (onGlobalAdminAuthority != null) {
                return onGlobalAdminAuthority.get(null, null);
            } else {
                throw new RuntimeException();
            }
        } else if (authoritiesList.contains(DEPARTMENT_ADMIN)) {
            if (onDepartmentAdminAuthority != null) {
                return onDepartmentAdminAuthority.get(decodedDetails.get(DEPARTMENT_ID).longValue(), null);
            } else {
                throw new RuntimeException();
            }
        } else if (authoritiesList.contains(SHIFT_ADMIN)) {
            if (onShiftAdminAuthority != null) {
                return onShiftAdminAuthority.get(decodedDetails.get(DEPARTMENT_ID).longValue(), decodedDetails.get(SHIFT_ID).longValue());
            } else {
                throw new RuntimeException();
            }
        } else {
            throw new DecodedDetailsMissingFieldException("No required authorities found");
        }
    }

    private Map<String, Integer> extractDecodedDetails(Authentication authentication) {
        OAuth2AuthenticationDetails oauthDetails
                = (OAuth2AuthenticationDetails) authentication.getDetails();
        return (Map<String, Integer>) oauthDetails.getDecodedDetails();
    }

    private List<String> getAuthoritiesList(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities
                = authentication.getAuthorities();

        return authorities.stream()
                .map(value -> ((GrantedAuthority) value).getAuthority())
                .collect(Collectors.toList());
    }
}
