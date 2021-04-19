package com.averude.uksatse.scheduler.security.logging;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.StringJoiner;

import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

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
            UserAccount userAccount = getUserAccount(authentication);
            user = new StringJoiner(", ", UserAccount.class.getSimpleName() + "[", "]")
                    .add("username='" + userAccount.getUsername() + "'")
                    .add("authority='" + userAccount.getAuthority() + "'")
                    .add("role='" + userAccount.getRole() + "'")
                    .toString();
        }
        return user;
    }
}
