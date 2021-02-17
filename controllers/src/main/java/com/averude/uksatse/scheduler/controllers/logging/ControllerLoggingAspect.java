package com.averude.uksatse.scheduler.controllers.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Slf4j
@Aspect
@Component
public class ControllerLoggingAspect {

    private static final String EMPTY_USER_NAME = "SYSTEM";

    @Before("@annotation(Logged)")
    public void logMethod(JoinPoint jp) {
        var user = EMPTY_USER_NAME;

        final var signature = jp.getSignature();

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            user = authentication.getPrincipal().toString();
        }

        log.debug("User:{} - executed [{} - {}] with args {}",
                user, signature.getDeclaringTypeName(), signature.getName(), Arrays.toString(jp.getArgs()));
    }
}
