package com.averude.uksatse.scheduler.security.logging;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.StringJoiner;

@Slf4j
@Aspect
@Component
public class ControllerLoggingAspect {

    private static final String EMPTY_USER_NAME = "SYSTEM";

    @Before("@annotation(Logged)")
    public void logMethod(JoinPoint jp) {
        var username = getCurrentUserString();

        final var signature = jp.getSignature();
        log.debug("User:{} - {} : {}({})", username, signature.getDeclaringType().getSimpleName(),
                signature.getName(), Arrays.toString(jp.getArgs()));
    }

    private String getCurrentUserString() {
        var user = EMPTY_USER_NAME;

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {

            if (authentication.getPrincipal() instanceof Jwt) {
                var jwt = (Jwt) authentication.getPrincipal();

                user = new StringJoiner(", ", UserAccount.class.getSimpleName() + "[", "]")
                        .add("username='" + jwt.getClaimAsString("user_name") + "'")
                        .add("level='" + jwt.getClaimAsString("level") + "'")
                        .add("role='" + jwt.getClaimAsString("role") + "'")
                        .toString();
            }

            if (authentication.getPrincipal() instanceof String) {
                user = (String) authentication.getPrincipal();
            }
        }
        return user;
    }
}
